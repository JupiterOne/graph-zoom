import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import getStepStartStates from './getStepStartStates';
import { integrationSteps } from './steps';
import {
  validateInvocation,
  IntegrationConfig,
  instanceConfigFields,
} from './config';

export const invocationConfig: IntegrationInvocationConfig<IntegrationConfig> = {
  instanceConfigFields,
  validateInvocation,
  getStepStartStates,
  integrationSteps,
};
