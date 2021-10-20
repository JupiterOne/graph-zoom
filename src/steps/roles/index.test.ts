import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig } from '../../config';
import {
  buildUserAndRolesRelationship,
  buildAccountAndRolesRelationship,
  fetchRoles,
} from '.';
import { integrationConfig } from '../../../test/config';
import { setupZoomRecording } from '../../../test/recording';
import { fetchUsers } from '../users';
import { Relationships } from '../constants';
import { fetchAccount } from '../account';

describe('#fetchRoles', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'fetchRoles',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchRoles(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
    }).toMatchSnapshot();

    const roles = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_role'),
    );
    expect(roles.length).toBeGreaterThan(0);
    expect(roles).toMatchGraphObjectSchema({
      _class: ['AccessRole'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_role' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          description: { type: 'string' },
        },
      },
    });
  });
});

describe('#buildUserAndRolesRelationship', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'buildUserAndRolesRelationship',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should build role and user relationship', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);
    await fetchRoles(context);
    await buildUserAndRolesRelationship(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
      collectedRelationships: context.jobState.collectedRelationships,
    }).toMatchSnapshot();

    const users = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_user'),
    );
    expect(users.length).toBeGreaterThan(0);
    expect(users).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_user' },
          name: { type: 'string' },
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          type: { type: 'number' },
          pmi: { type: 'number' },
          timezone: { type: 'string' },
          verified: { type: 'number' },
          createdAt: { type: 'string' },
          lastLoginTime: { type: 'string' },
          lastClientVersion: { type: 'string' },
          picUrl: { type: 'string' },
          language: { type: 'string' },
          phoneNumber: { type: 'string' },
          status: { type: 'string' },
          roleId: { type: 'string' },
          dept: { type: 'string' },
          groupIds: {
            type: 'array',
            items: { type: 'string' },
          },
          hostKey: { type: 'string' },
        },
      },
    });

    const roles = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_role'),
    );
    expect(roles.length).toBeGreaterThan(0);
    expect(roles).toMatchGraphObjectSchema({
      _class: ['AccessRole'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_role' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          description: { type: 'string' },
        },
      },
    });

    expect(
      context.jobState.collectedRelationships.filter(
        (e) => e._type === Relationships.GROUP_HAS_USER._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: 'ASSIGNED' },
          _type: {
            const: 'zoom_user_assigned_role',
          },
        },
      },
    });
  });
});

describe('#buildAccountAndRolesRelationship', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'buildAccountAndRolesRelationship',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should build role and account relationship', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchAccount(context);
    await fetchRoles(context);
    await buildAccountAndRolesRelationship(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
      collectedRelationships: context.jobState.collectedRelationships,
    }).toMatchSnapshot();

    const account = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_account'),
    );
    expect(account.length).toBe(1);
    expect(account).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_account' },
          name: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
        },
      },
    });

    const roles = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_role'),
    );
    expect(roles.length).toBeGreaterThan(0);
    expect(roles).toMatchGraphObjectSchema({
      _class: ['AccessRole'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_role' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          description: { type: 'string' },
        },
      },
    });

    expect(
      context.jobState.collectedRelationships.filter(
        (e) => e._type === Relationships.ACCOUNT_HAS_ROLE._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: 'HAS' },
          _type: {
            const: 'zoom_account_has_role',
          },
        },
      },
    });
  });
});
