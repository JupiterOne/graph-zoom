import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import {
  ACCOUNT_ENTITY_KEY,
  Entities,
  IntegrationSteps,
  Relationships,
} from '../constants';
import { createUserEntity } from './converters';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUsers(async (user) => {
    const userSettings = await apiClient.getUserSettings(user.id as string);
    const meetingAuthenticationSettings = await apiClient.getUserSettingsMeetingAuthentication(
      user.id as string,
    );
    const recordingAuthenticationSettings = await apiClient.getUserSettingsRecordingAuthentication(
      user.id as string,
    );
    const meetingSecuritySettings = await apiClient.getUserSettingsMeetingSecurity(
      user.id as string,
    );

    await jobState.addEntity(
      createUserEntity({
        user,
        userSettings,
        meetingAuthenticationSettings,
        recordingAuthenticationSettings,
        meetingSecuritySettings,
      }),
    );
  });
}

export async function buildAccountAndUsersRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    { _type: Entities.USER._type },
    async (userEntity) => {
      if (accountEntity && userEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: accountEntity,
            to: userEntity,
          }),
        );
      }
    },
  );
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchUsers,
  },
  {
    id: IntegrationSteps.BUILD_ACCOUNT_AND_USER_RELATIONSHIP,
    name: 'Build Account and User Relationship',
    entities: [],
    relationships: [Relationships.ACCOUNT_HAS_USER],
    dependsOn: [IntegrationSteps.USERS, IntegrationSteps.ACCOUNT],
    executionHandler: buildAccountAndUsersRelationship,
  },
];
