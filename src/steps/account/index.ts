import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { ACCOUNT_ENTITY_KEY, Entities, IntegrationSteps } from '../constants';
import { createAccountEntity } from './converters';

export async function fetchAccount({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const currentUser = await apiClient.getCurrentUser();
  const accountEntity = createAccountEntity(currentUser);
  await jobState.addEntity(accountEntity);
  await jobState.setData(ACCOUNT_ENTITY_KEY, accountEntity);
}

export const accountSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.ACCOUNT,
    name: 'Fetch Account',
    entities: [Entities.ACCOUNT],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAccount,
  },
];
