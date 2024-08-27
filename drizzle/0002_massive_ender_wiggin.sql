CREATE TABLE IF NOT EXISTS "userSubscription" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeCustomerId" text,
	"stripeSubscriptionId" text,
	"stripePriceId" text,
	"stripeCurrentPeriodEnd" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSubscription" ADD CONSTRAINT "userSubscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
