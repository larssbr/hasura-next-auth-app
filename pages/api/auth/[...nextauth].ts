import GitHubProvider from 'next-auth/providers/github'
import LinkedInProvider from "next-auth/providers/linkedin";
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import AzureADProvider, { AzureADProfile } from 'next-auth/providers/azure-ad';

import { checkIsAdminEmail } from '../../../lib/auth/checkIsAdminEmail';
import { signJWT } from '../../../lib/auth/jwt';
import { setAndReturnADProfile } from '../../../lib/auth/setAndReturnADProfile';
import { getHasuraApiUrl } from '../../../lib/getHasuraApiUrl';

import { HasuraAdapter } from '../../../hasura-adapter';
import { isLocalEnv } from '../../../util/isLocalEnv';

const useSecureCookies = !!process.env.VERCEL_URL

export const authOptions: NextAuthOptions = {
  adapter: HasuraAdapter({
    endpoint: getHasuraApiUrl(),
    adminSecret: process.env.HASURA_ADMIN_SECRET as string,
    graphqlRequestOptions: {
      // Optional graphql-request options
    },
  }) as Adapter
  | undefined,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,

      authorization: {
        params: {
          scope: 'openid profile email', // User.Read.All',
        },
      },
      // idToken: false,
      async profile(profile: AzureADProfile, tokens) {
        return setAndReturnADProfile(profile, tokens);
      },
    }),
  ],
  secret: process.env.SECRET as string,
  session: {
    strategy: 'jwt', //'database',
    // Seconds - How long until an idle session expires and is no longer valid.
    //maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    //updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ user, token }) {
      const isAdminEmail = checkIsAdminEmail(user?.email);
      if (user) {
        token.user = {
          //...token.user,
          accessToken: await signJWT(user, isAdminEmail),
          role: isAdminEmail ? user.role : 'guest',
          permissions: isAdminEmail ? user?.permissions : 'guest',
          name: user?.name,
          image: user?.image,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user // = token.user;

      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: isLocalEnv() ? true : false,
    // cookies: {
  //   sessionToken: {
  //     name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain: '.solutions-subdomain-auth.vercel.sh',
  //       secure: useSecureCookies,
  //     },
  //   },
  // },
};

export default NextAuth(authOptions);
