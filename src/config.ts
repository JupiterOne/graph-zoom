import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  zoomAccessToken: {
    type: 'string',
    mask: true,
  },
  scopes: {
    type: 'string',
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The OAuth token used to authenticate requests.
   */
  zoomAccessToken: string;
  scopes: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.zoomAccessToken || !config.scopes) {
    throw new IntegrationValidationError(
      'Config requires zoom access token and scopes field. Please generate from OAuth server.',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
