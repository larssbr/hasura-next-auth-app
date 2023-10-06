

# steps of what i did
# 1
I cloned the example repo of next auth ( subdomain-auth)
`pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/subdomain-auth subdomain-auth`


# 2
Then I modified the [nextAuth].ts file to use the "jwt" strategy


HASURA_GRAPHQL_JWT_SECRET

generate a 32 character long jwt secret:


To generate a new secret with 32 characters, you can use the openssl command. Open your terminal and run:

`openssl rand -base64 32`



once you add the secret next step is to run console.

go into folder /graphql-api/hasura and run `hasura console`

Then click on the postgres connector and add the environment variable: DATABASE_CONNECTION_STRING

this is the DATABASE_CONNECTION_STRING that is from docker in your docker-compose.yaml file.

# 3 Have to configure types in files next-auth.d.ts to extend the default types of next-auth


# 4 set up hasura locally in order to create database tables to store the user jwt token

following this guide (https://hasura.io/docs/latest/getting-started/docker-simple/) we do:

`curl https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml -o docker-compose.yml`

then we run:

`docker compose up -d`

# 5
Then i went into hasura and I created the folowing tables:

users

accounts

# 6 connect with 3-party providers.






