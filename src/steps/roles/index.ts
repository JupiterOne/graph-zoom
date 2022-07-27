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
import { createRoleEntity } from './converters';
import { getUserKey } from '../users/converters';

export async function fetchRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = await getOrCreateAPIClient(instance.config);

  await apiClient.iterateRoles(async (role) => {
    await jobState.addEntity(createRoleEntity(role));
  });
}

export async function buildUserAndRolesRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = await getOrCreateAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ROLE._type },
    async (roleEntity) => {
      const roleId = roleEntity.id;

      await apiClient.iterateUsersInRole(roleId as string, async (user) => {
        const userEntity = await jobState.findEntity(getUserKey(user.id));

        if (userEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.ASSIGNED,
              from: userEntity,
              to: roleEntity,
            }),
          );
        }
      });
    },
  );
}

export async function buildAccountAndRolesRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    { _type: Entities.ROLE._type },
    async (roleEntity) => {
      if (accountEntity && roleEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: accountEntity,
            to: roleEntity,
          }),
        );
      }
    },
  );
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRoles,
  },
  {
    id: IntegrationSteps.BUILD_USER_AND_ROLE_RELATIONSHIP,
    name: 'Build User and Role Relationship',
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_ROLE],
    dependsOn: [IntegrationSteps.ROLES, IntegrationSteps.USERS],
    executionHandler: buildUserAndRolesRelationship,
  },
  {
    id: IntegrationSteps.BUILD_ACCOUNT_AND_ROLE_RELATIONSHIP,
    name: 'Build Account and Role Relationship',
    entities: [],
    relationships: [Relationships.ACCOUNT_HAS_ROLE],
    dependsOn: [IntegrationSteps.ROLES, IntegrationSteps.ACCOUNT],
    executionHandler: buildAccountAndRolesRelationship,
  },
];
