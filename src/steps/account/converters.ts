import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomUser } from '../../types';

export function getAccountKey(id: string): string {
  return `zoom_account:${id}`;
}

// TODO We're using the data available in api/v2/users/me to create the account
// because the Account name is only available via api/v2/accounts/me or calling
// it directly at api/v2/accounts/<accountID> and both options reside in the
// 'Master Account API' area and require :account:master OAuth token permissions.
// If this becomes available without elevated permissions in the future, we
// should change the account name below to be set to the name instead of the
// account_number that we have right now.
export function createAccountEntity(data: ZoomUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.ACCOUNT._class,
        _type: Entities.ACCOUNT._type,
        _key: getAccountKey(data.account_id),
        accountId: data.account_id,
        name: `${data.account_number}`,
      },
    },
  });
}
