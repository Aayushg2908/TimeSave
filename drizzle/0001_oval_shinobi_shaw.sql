CREATE TABLE IF NOT EXISTS "userNote" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"content" text NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userNote" ADD CONSTRAINT "userNote_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
