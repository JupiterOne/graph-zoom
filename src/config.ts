import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import getOrCreateAPIClient from './getOrCreateAPIClient';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  accountId: {
    type: 'string',
    mask: true,
  },
  clientId: {
    type: 'string',
    mask: true,
  },
  clientSecret: {
    type: 'string',
    mask: true,
  },
  scopes: {
    type: 'string',
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  accountId: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (
    !config.accountId ||
    !config.clientId ||
    !config.clientSecret ||
    !config.scopes
  ) {
    throw new IntegrationValidationError(
      'Config requires all of { accountId, clientId, clientSecret, scopes }.',
    );
  }

  const apiClient = await getOrCreateAPIClient(config);
  await apiClient.verifyAuthentication();
}
