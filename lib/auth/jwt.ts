import { createSecretKey } from 'crypto';
import { JWTPayload, SignJWT } from 'jose';
import { User } from 'next-auth';

/**
 * * Signs a payload with the existing JWT configuration
 */

export type JwtSecret = {
  type: 'HS256' | 'HS238' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'Ed25519';
  key: string;
  jwk_url?: string;
  claims_namespace?: string;
  claims_namespace_path?: string;
  claims_format?: string;
  audience?: string;
  issuer?: string;
  claims_map?: string;
  allowed_skew?: string;
  header?: string;
};

export type JwtSecret_forjwkPeople = {
  jwk_url: string;
  issuer: string;
};

export async function signJWT(
  user: User,
  isAdminEmail: boolean
): Promise<string> {
  const secret = createSecretKey(
    process.env.NEXTAUTH_SECRET as string,
    'utf-8'
  );

  const payload: JWTPayload = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': isAdminEmail ? user.role : 'guest', // user.role, // "anonymous"
      'x-hasura-allowed-roles': isAdminEmail ? [user.role] : ['guest'], // ['anonymous', 'admin_user', 'admin'], // ["user", "admin", "user_admin", "anonymous"]
      'x-hasura-user-id': user.id,
      //'x-hasura-role': 'admin_user', //user.role,
    },
  };

  const oneHourAsMiliseconds = 60 * 60 * 1000;
  const dayAsHours = 24;
  const monthAsDays = 30;
  const monthAsMilicseconds = monthAsDays * dayAsHours * oneHourAsMiliseconds;

  const signedJwt = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(Date.now() + monthAsMilicseconds)
    //.setIssuer(issuer || 'hasura-auth')
    .sign(secret);

  return signedJwt;
}

/*
--> we choose hs256 for now as it is fast and secure

HS512 and HS256 are both algorithms used for generating HMAC-based (Hash-based Message Authentication Code) digital signatures, which can be used for verifying the integrity of data and ensuring that it has not been tampered with.

The main difference between HS512 and HS256 is the size of the hash that is generated. HS512 uses a 512-bit hash, while HS256 uses a 256-bit hash. This means that HS512 is considered to be more secure, as it requires more computational power to break the hash function.

However, HS512 also requires more processing power to generate and verify the signature, which can be a concern for applications where performance is critical. HS256 is therefore often preferred in situations where speed is important, such as in web applications or mobile apps.

In summary, both HS512 and HS256 are effective algorithms for generating HMAC-based digital signatures, but the choice between them depends on the specific requirements of the application, including the level of security required and the need for speed and efficiency.


*/
