import { logErr } from '../util/logger';

export function getHasuraApiUrl(): string {
  if (process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT) {
    return process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT;
  } else {
    logErr('HASURA_PROJECT_ENDPOINT env variable is not defined');
    return 'https://dbrokerapp.hasura.app/v1/graphql';
  }
}

export function getHasuraApiUrlForSubscription() {
  if (process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT_SUBSCRIPTION) {
    return process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT_SUBSCRIPTION;
  } else {
    logErr(
      'NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT_SUBSCRIPTION env variable is not defined'
    );
    return 'wss://dbrokerapp.hasura.app/v1/graphql';
  }
}
