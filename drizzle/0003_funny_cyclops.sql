CREATE TABLE IF NOT EXISTS "userTodo" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"content" text NOT NULL,
	"tag" text,
	"completed" boolean NOT NULL,
	"date" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userTodo" ADD CONSTRAINT "userTodo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
