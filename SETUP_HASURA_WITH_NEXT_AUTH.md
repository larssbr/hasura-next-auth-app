### Overview
This document outlines the steps for setting up NextAuth with subdomain authentication and integrating it with Hasura.

### Step 1: Clone the Example Repo
Start by cloning the NextAuth example repo, specifically the subdomain-auth example:

`pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/subdomain-auth subdomain-auth``

### Step 2: Configure JWT Strategy
Navigate to the [nextAuth].ts file and switch the authentication strategy to "JWT".

Generate JWT Secret
You'll need a 32-character long JWT secret. To generate one, run the following command:

`openssl rand -base64 32``

After adding the secret, fire up the Hasura console:


cd /graphql-api/hasura
hasura console
Set Database Connection String
In the Hasura console, locate the Postgres connector and set the DATABASE_CONNECTION_STRING environment variable. This should match the connection string specified in your docker-compose.yaml file.

### Step 3: Update Type Definitions
Update next-auth.d.ts to extend the default types provided by NextAuth.

### Step 4: Local Hasura Setup
To set up Hasura locally and create the necessary database tables, follow this guide. Download the default docker-compose.yml:


`curl https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml -o docker-compose.yml``

Start the Hasura Docker container:

`docker-compose up -d`

### Step 5: Create Tables in Hasura
Navigate to the Hasura console and create the following tables:

users
accounts

### Step 6: Third-Party Provider Integration
Finally, establish connections with any third-party authentication providers you plan to use.

- add a file: .env

In .env.example file there is a starting point for setting up the third party providers.

Just go to each website and set up the account
-github: https://next-auth.js.org/providers/github
-azure AD: https://next-auth.js.org/providers/azure-ad
-linkedin: https://next-auth.js.org/providers/linkedin

one can add any of the providers from next-auth providers: https://next-auth.js.org/providers/

And you're all set!