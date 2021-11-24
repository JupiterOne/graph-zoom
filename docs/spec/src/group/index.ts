import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const groupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://api.zoom.us/v2/groups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [
      {
        resourceName: 'Group',
        _type: 'zoom_group',
        _class: 'Group',
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://api.zoom.us/v2/groups/{groupId}/members
     * PATTERN: Build Relationship
     */
    id: 'build-user-and-group-relationship',
    name: 'Build User and Group Relationship',
    entities: [],
    relationships: [
      {
        _type: 'zoom_group_has_zoom_user',
        _class: RelationshipClass.HAS,
        sourceType: 'zoom_group',
        targetType: 'zoom_user',
      },
    ],
    dependsOn: ['fetch-groups', 'fetch-users'],
    implemented: true,
  },
];
