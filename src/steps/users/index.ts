import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import getOrCreateAPIClient from '../../getOrCreateAPIClient';
import {
  ACCOUNT_ENTITY_KEY,
  Entities,
  IntegrationSteps,
  Relationships,
} from '../constants';
import { createUserEntity, getUserKey } from './converters';

export async function fetchUsers({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = await getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateUsers(async (user) => {
    const userSettings = await apiClient.getUserSettings(user.id as string);
    const meetingAuthenticationSettings =
      await apiClient.getUserSettingsMeetingAuthentication(user.id as string);
    const recordingAuthenticationSettings =
      await apiClient.getUserSettingsRecordingAuthentication(user.id as string);
    const meetingSecuritySettings =
      await apiClient.getUserSettingsMeetingSecurity(user.id as string);

    // We have seen instances of duplicate users being returned.  Based on our
    // duplicate key tracker, these users were identical not just in their ID, but
    // across all properties.  Logging duplicates, but these should be safe to
    // omit.
    if (!jobState.hasKey(getUserKey(user.id))) {
      await jobState.addEntity(
        createUserEntity({
          user,
          userSettings,
          meetingAuthenticationSettings,
          recordingAuthenticationSettings,
          meetingSecuritySettings,
        }),
      );
    } else {
      logger.info(
        {
          userId: user.id,
          lastName: user.last_name,
          firstName: user.first_name,
        },
        `User already found in ingested data.  Skipping.`,
      );
    }
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
