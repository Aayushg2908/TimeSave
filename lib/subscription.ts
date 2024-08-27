import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { userSubscription as userSubscriptionDrizzle } from "@/db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const query = await db
    .select()
    .from(userSubscriptionDrizzle)
    .where(eq(userSubscriptionDrizzle.userId, session.user.id));
  const userSubscription = query[0];

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
