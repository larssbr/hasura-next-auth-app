CREATE TABLE "public"."sessions" ("sessiontoken" text NOT NULL, "userid" text NOT NULL DEFAULT uuid_generate_v4(), "expires" text NOT NULL, PRIMARY KEY ("userid") , UNIQUE ("userid"));
