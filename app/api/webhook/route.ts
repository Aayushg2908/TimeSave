import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const query = await db
      .select()
      .from(userSubscription)
      .where(eq(userSubscription.userId, session?.metadata?.userId));
    const subscription = query[0];

    if (!subscription) {
      await db.insert(userSubscription).values({
        userId: session?.metadata?.userId,
        stripeSubscriptionId: session.id,
        stripeCustomerId: session.customer as string,
        stripePriceId: session.amount_total
          ? String(session.amount_total / 100)
          : null,
        stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } else {
      await db
        .update(userSubscription)
        .set({
          stripePriceId: session.amount_total?.toString(),
          stripeCurrentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ),
        })
        .where(eq(userSubscription.stripeSubscriptionId, session.id));
    }
  }

  return new NextResponse(null, { status: 200 });
}
