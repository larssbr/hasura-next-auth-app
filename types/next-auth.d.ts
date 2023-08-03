import { type User } from 'next-auth';
import { type AdapterUser } from '../hasura-adapter/hasura-adapter-types';

declare module 'next-auth' {
  // eslint-disable-next-line
  interface User extends AdapterUser {}

  interface Session {
    user: JWT['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      role?: User['role'];
      accessToken: string;
      permissions: string | null | undefined;
      name: string | null | undefined;
      image?: string | null | undefined;
    };
  }
}

export type statusType = 'authenticated' | 'loading' | 'unauthenticated';
