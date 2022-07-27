import { IntegrationConfig } from './config';
import { APIClient } from './client';

let client: APIClient;

export default async function getOrCreateAPIClient(
  config: IntegrationConfig,
): Promise<APIClient> {
  if (!client) {
    client = new APIClient(config);
    await client.initializeAccessToken();
  }
  return client;
}
