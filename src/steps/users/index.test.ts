import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig } from '../../config';
import { buildAccountAndUsersRelationship, fetchUsers } from '.';
import { integrationConfig } from '../../../test/config';
import { setupZoomRecording } from '../../../test/recording';
import { fetchAccount } from '../account';
import { Relationships } from '../constants';

describe('#fetchUsers', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'fetchUsers',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
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
  });
});

describe('#buildAccountAndUsersRelationship', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'buildAccountAndUsersRelationship',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should build group and account relationship', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchAccount(context);
    await fetchUsers(context);
    await buildAccountAndUsersRelationship(context);

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

    expect(
      context.jobState.collectedRelationships.filter(
        (e) => e._type === Relationships.ACCOUNT_HAS_USER._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: 'HAS' },
          _type: {
            const: 'zoom_account_has_user',
          },
        },
      },
    });
  });
});
