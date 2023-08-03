import { OAuthUserConfig } from 'next-auth/providers/oauth';

export function getLInkedInProviderCredentials(): OAuthUserConfig<any> {
  const clientIdToUse = process.env.LINKEDIN_CLIENT_ID_PROD as string;

  const clientSecretToUse = process.env.LINKEDIN_CLIENT_SECRET_PROD as string;

  return {
    clientId: clientIdToUse,
    clientSecret: clientSecretToUse,
    token: {
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      async request({
        client,
        params,
        checks,
        provider,
      }: {
        client: any;
        params: any;
        checks: any;
        provider: any;
      }) {
        const response = await client.oauthCallback(
          provider.callbackUrl,
          params,
          checks,
          {
            exchangeBody: {
              client_id: clientIdToUse,
              client_secret: clientSecretToUse,
            },
          }
        );
        return {
          tokens: response,
        };
      },
    },
  };
}
