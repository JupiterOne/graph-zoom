import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomGroup } from '../../types';

export function getGroupKey(id: string): string {
  return `zoom_group:${id}`;
}

export function createGroupEntity(data: ZoomGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.GROUP._class,
        _type: Entities.GROUP._type,
        _key: getGroupKey(data.id),
        displayName: data.name,
        totalMembers: data.total_members,
        directoryPrivacy: data.directory_privacy,
      },
    },
  });
}
