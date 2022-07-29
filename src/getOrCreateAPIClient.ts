import { IntegrationConfig } from './config';
import { APIClient } from './client';
import { IntegrationProviderAuthenticationError } from '@jupiterone/integration-sdk-core';

let client: APIClient;

export default async function getOrCreateAPIClient(
  config: IntegrationConfig,
): Promise<APIClient> {
  if (!client) {
    client = new APIClient(config);
    try {
      await client.initializeAccessToken();
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        endpoint: client.authenticationUri(config.accountId),
        status: err.code,
        statusText: err.message,
      });
    }
  }
  return client;
}
