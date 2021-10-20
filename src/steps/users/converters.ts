import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomUser } from '../../types';

export function getUserKey(id: string): string {
  return `zoom_user:${id}`;
}

export function createUserEntity(data: ZoomUser) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.USER._class,
        _type: Entities.USER._type,
        _key: getUserKey(data.id),
        username: data.email,
        name: `${data.first_name} ${data.last_name}`,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        type: data.type,
        pmi: data.pmi,
        timezone: data.timezone,
        verified: data.verified,
        createdAt: data.created_at,
        lastLoginTime: data.last_login_time,
        lastClientVersion: data.last_client_version,
        picUrl: data.pic_url,
        language: data.language,
        phoneNumber: data.phone_number,
        status: data.status,
        roleId: data.role_id,
        dept: data.dept,
        groupIds: data.group_ids,
        hostKey: data.host_key,
      },
    },
  });
}
