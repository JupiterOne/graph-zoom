import {
  IntegrationExecutionContext,
  StepStartStates,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import { IntegrationSteps } from './steps/constants';

export default function getStepStartStates(
  context: IntegrationExecutionContext<IntegrationConfig>,
): StepStartStates {
  const { instance, logger } = context;

  const enabledScopes = instance.config.scopes.split(' ');

  const stepStartStates: StepStartStates = {
    [IntegrationSteps.ACCOUNT]: {
      disabled: !enabledScopes.includes('user:read:admin'),
    },
    [IntegrationSteps.BUILD_ACCOUNT_AND_GROUP_RELATIONSHIP]: {
      disabled: !enabledScopes.includes('group:read:admin'),
    },
    [IntegrationSteps.BUILD_ACCOUNT_AND_ROLE_RELATIONSHIP]: {
      disabled: !enabledScopes.includes('role:read:admin'),
    },
    [IntegrationSteps.BUILD_ACCOUNT_AND_USER_RELATIONSHIP]: {
      disabled: !enabledScopes.includes('user:read:admin'),
    },
    [IntegrationSteps.BUILD_USER_AND_GROUP_RELATIONSHIP]: {
      disabled: !(
        enabledScopes.includes('user:read:admin') &&
        enabledScopes.includes('group:read:admin')
      ),
    },
    [IntegrationSteps.BUILD_USER_AND_ROLE_RELATIONSHIP]: {
      disabled: !(
        enabledScopes.includes('user:read:admin') &&
        enabledScopes.includes('role:read:admin')
      ),
    },
    [IntegrationSteps.GROUPS]: {
      disabled: !enabledScopes.includes('group:read:admin'),
    },
    [IntegrationSteps.ROLES]: {
      disabled: !enabledScopes.includes('role:read:admin'),
    },
    [IntegrationSteps.USERS]: {
      disabled: !enabledScopes.includes('user:read:admin'),
    },
    [IntegrationSteps.USER_SETTINGS]: {
      disabled: !enabledScopes.includes('user:read:admin'),
    },
  };

  logger.info(
    { stepStartStates: JSON.stringify(stepStartStates) },
    'Step start states',
  );
  return stepStartStates;
}
