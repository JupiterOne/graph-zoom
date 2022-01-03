import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomUser } from '../../types';

export function getAccountKey(id: string): string {
  return `zoom_account:${id}`;
}

export function createAccountEntity(data: ZoomUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.ACCOUNT._class,
        _type: Entities.ACCOUNT._type,
        _key: getAccountKey(data.id),
        username: data.email,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
      },
    },
  });
}
