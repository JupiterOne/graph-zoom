import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Entities, IntegrationSteps, Relationships } from '../constants';
import { createUserSettingsEntity } from './converters';

export async function fetchUserSettings({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.USER._type },
    async (userEntity) => {
      const userSettings = await apiClient.getUserSettings(
        userEntity.id as string,
      );

      const meetingAuthenticationSettings = await apiClient.getUserSettingsMeetingAuthentication(
        userEntity.id as string,
      );

      const recordingAuthenticationSettings = await apiClient.getUserSettingsRecordingAuthentication(
        userEntity.id as string,
      );

      const meetingSecuritySettings = await apiClient.getUserSettingsMeetingSecurity(
        userEntity.id as string,
      );

      const userSettingsEntity = createUserSettingsEntity({
        user: userEntity,
        userSettings,
        meetingAuthenticationSettings,
        recordingAuthenticationSettings,
        meetingSecuritySettings,
      });

      await jobState.addEntity(userSettingsEntity);

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: userEntity,
          to: userSettingsEntity,
        }),
      );
    },
  );
}

export const userSettingsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.USER_SETTINGS,
    name: 'Fetch User Settings',
    entities: [Entities.USER_SETTINGS],
    relationships: [Relationships.USER_HAS_USER_SETTINGS],
    dependsOn: [IntegrationSteps.USERS],
    executionHandler: fetchUserSettings,
  },
];
