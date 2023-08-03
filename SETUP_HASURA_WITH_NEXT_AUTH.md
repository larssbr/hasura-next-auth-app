

# steps of what i did

# 1
I cloned the example repo of next auth ( subdomain-auth)
`pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/subdomain-auth subdomain-auth`



# 2
Then I modified the [nextAuth].ts file to use the "jwt" strategy


# 3 Have to configure types in files next-auth.d.ts to extend the default types of next-auth




# 4 set up hasura locally in order to create database tables to store the user jwt token



# 5
Then i went into hasura and I created the folowing tables:

users

accounts




