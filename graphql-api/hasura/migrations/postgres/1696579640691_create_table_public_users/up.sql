CREATE TABLE "public"."users" ("id" text NOT NULL, "name" text, "email" text NOT NULL, "image" text, "permissions" text, "role" text, "emailVerified" text, PRIMARY KEY ("id") , UNIQUE ("id"));
