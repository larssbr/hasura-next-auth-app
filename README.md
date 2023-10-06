
### Accelerate Your Development with Hasura and Auth.js
Welcome to a starter project that harnesses the power of Hasura's GraphQL engine and the flexibility of Auth.js to create robust, secure, and scalable applications.

### What's Hasura?
Hasura is an open-source engine that elevates your API development experience by providing instant GraphQL or REST APIs. With built-in authorization features, you get secure access to your data right off the bat. It's like putting your API development on steroids, but in a good way. Read more on Hasura's official site and get into the nitty-gritty with our docs.

### Meet Auth.js
Auth.js is not just another authentication package; it's a full-stack, open-source ecosystem built on Web Standard APIs. Whether you're developing with Next.js, Auth.js has got you covered.

Check out authjs.dev for framework-specific libraries, or dive into next-auth.js.org for Next.js specific use-cases.

Key Features
Flexibility: Works with any OAuth 2.0+, OIDC, or even your custom authentication.
Pre-configured Sign-In: Supports popular sign-in services out of the box.
Passwordless and More: Email-based and other passwordless authentication methods supported.
Backend Agnostic: Got a database? Great. Don't have one? No worries. It even works with LDAP, Active Directory, and more.
Runtime Independent: Run it wherever JavaScript runs - Vercel, Node.js, Serverless; you name it.
Take Control of Your Data
Database Support: Works with all the SQL and NoSQL heroes - MySQL, MariaDB, Postgres, you get the drift.
Security: Robust CSRF token handling, encrypted JWTs, and aligned with the latest OWASP guidelines.
Type Safety with TypeScript
If TypeScript is your jam, you'll appreciate how Auth.js is designed with type safety in mind. Dive deeper into the docs to find out how.


### The nextjs + authjs + hasura stack
The union of Hasura and Auth.js will accelerate your development cycle and provide a secure, scalable solution that meets modern demands. Join us in making API development a breeze!

Feel free to jump into the code and let the magic begin! 🚀


### To start the project:

install:
`yarn`

build docker:
`yarn docker:up`

run hasura console locally
`yarn docker:start`


to run start nextjs application
`yarn dev`

⚠️ remember to configuere .env file
⚠️ remember to generate jwt secret