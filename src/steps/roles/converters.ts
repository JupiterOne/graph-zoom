import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomRole } from '../../types';

export function getRoleKey(id: string): string {
  return `zoom_role:${id}`;
}

export function createRoleEntity(data: ZoomRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.ROLE._class,
        _type: Entities.ROLE._type,
        _key: getRoleKey(data.id),
        displayName: data.name,
        totalMembers: data.total_members,
        description: data.description,
        admin: data.name === 'Owner' || data.name === 'Admin',
      },
    },
  });
}
