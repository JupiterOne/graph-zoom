import fetch, { Response } from 'node-fetch';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  GroupsResponse,
  PageIteratee,
  PaginatedUserInGroupsResponse,
  PaginatedUserInRolesResponse,
  PaginatedUsers,
  RolesResponse,
  ZoomGroup,
  ZoomGroupMember,
  ZoomRole,
  ZoomRoleMember,
  ZoomUser,
  ZoomUserSettings,
  ZoomUserSettingsMeetingAuthentication,
  ZoomUserSettingsMeetingSecurity,
  ZoomUserSettingsRecordingAuthentication,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private readonly paginateEntitiesPerPage = 30;

  private withBaseUri(path: string): string {
    return `https://api.zoom.us/v2/${path}`;
  }

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    const response = await fetch(uri, {
      method,
      headers: {
        Authorization: `Bearer ${this.config.zoomAccessToken}`,
      },
    });
    if (!response.ok) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: response.status,
        statusText: response.statusText,
      });
    }
    return response;
  }

  // OAuth scope: 'user:read:admin'
  public async getCurrentUser(): Promise<ZoomUser> {
    const endpoint = this.withBaseUri(`users/me`);
    const response = await this.request(endpoint, 'GET');
    return (await response.json()) as ZoomUser;
  }

  // OAuth scope: 'user:read:admin'
  public async iterateUsers(
    pageIteratee: PageIteratee<ZoomUser>,
  ): Promise<void> {
    let body: PaginatedUsers;
    let pageNumber = 1;

    do {
      const endpoint = this.withBaseUri(
        `users?page_size=${this.paginateEntitiesPerPage}&page_number=${pageNumber}`,
      );
      const response = await this.request(endpoint, 'GET');

      if (!response.ok) {
        throw new IntegrationProviderAPIError({
          endpoint: '/users',
          status: response.status,
          statusText: response.statusText,
        });
      }

      body = await response.json();

      for (const user of body.users) {
        await pageIteratee(user);
      }

      pageNumber = body.page_number + 1;
    } while (pageNumber <= body.page_count);
  }

  // OAuth scope: 'group:read:admin'
  public async iterateGroups(
    pageIteratee: PageIteratee<ZoomGroup>,
  ): Promise<void> {
    const groupsApiRoute = this.withBaseUri('groups');

    const response = await this.request(groupsApiRoute, 'GET');
    const body: GroupsResponse = await response.json();

    for (const group of body.groups) {
      await pageIteratee(group);
    }
  }

  // OAuth scope: 'group:read:admins'
  public async iterateUsersInGroup(
    groupId: string,
    pageIteratee: PageIteratee<ZoomGroupMember>,
  ): Promise<void> {
    let body: PaginatedUserInGroupsResponse;
    let pageNumber = 1;

    do {
      const endpoint = this.withBaseUri(
        `groups/${groupId}/members?page_size=${this.paginateEntitiesPerPage}&page_number=${pageNumber}`,
      );
      const response = await this.request(endpoint, 'GET');

      if (!response.ok) {
        throw new IntegrationProviderAPIError({
          endpoint: 'groups/{groupId}/members',
          status: response.status,
          statusText: response.statusText,
        });
      }

      body = await response.json();

      for (const member of body.members) {
        await pageIteratee(member);
      }

      pageNumber = body.page_count + 1;
    } while (pageNumber <= body.page_count);
  }

  // OAuth scope: 'role:read:admin'
  public async iterateRoles(
    pageIteratee: PageIteratee<ZoomRole>,
  ): Promise<void> {
    const rolesApiRoute = this.withBaseUri('roles');

    const response = await this.request(rolesApiRoute, 'GET');
    const body: RolesResponse = await response.json();

    for (const role of body.roles) {
      await pageIteratee(role);
    }
  }

  // OAuth scope: 'role:read:admin'
  public async iterateUsersInRole(
    roleId: string,
    pageIteratee: PageIteratee<ZoomRoleMember>,
  ): Promise<void> {
    let body: PaginatedUserInRolesResponse;
    let pageNumber = 1;

    do {
      const endpoint = this.withBaseUri(
        `roles/${roleId}/members?page_size=${this.paginateEntitiesPerPage}&page_number=${pageNumber}`,
      );
      const response = await this.request(endpoint, 'GET');

      if (!response.ok) {
        throw new IntegrationProviderAPIError({
          endpoint: 'roles/{roleId}/members',
          status: response.status,
          statusText: response.statusText,
        });
      }

      body = await response.json();

      for (const member of body.members) {
        await pageIteratee(member);
      }

      pageNumber = body.page_count + 1;
    } while (pageNumber <= body.page_count);
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettings(userId: string): Promise<ZoomUserSettings> {
    const userSettingsApiRoute = this.withBaseUri(`users/${userId}/settings`);

    const response = await this.request(userSettingsApiRoute, 'GET');
    return response.json();
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsMeetingAuthentication(
    userId: string,
  ): Promise<ZoomUserSettingsMeetingAuthentication> {
    const userSettingsMeetingAuthenticationApiRoute = this.withBaseUri(
      `users/${userId}/settings?option=meeting_authentication`,
    );

    const response = await this.request(
      userSettingsMeetingAuthenticationApiRoute,
      'GET',
    );

    return response.json();
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsRecordingAuthentication(
    userId: string,
  ): Promise<ZoomUserSettingsRecordingAuthentication> {
    const userSettingsRecordingAuthenticationApiRoute = this.withBaseUri(
      `users/${userId}/settings?option=recording_authentication`,
    );

    const response = await this.request(
      userSettingsRecordingAuthenticationApiRoute,
      'GET',
    );
    return response.json();
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsMeetingSecurity(
    userId: string,
  ): Promise<ZoomUserSettingsMeetingSecurity> {
    const userSettingsMeetingSecurityApiRoute = this.withBaseUri(
      `users/${userId}/settings?option=meeting_security`,
    );

    const response = await this.request(
      userSettingsMeetingSecurityApiRoute,
      'GET',
    );
    return response.json();
  }

  public async verifyAuthentication(): Promise<void> {
    const usersApiRoute = this.withBaseUri('users/me');
    try {
      await this.request(usersApiRoute, 'GET');
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        endpoint: usersApiRoute,
        status: err.code,
        statusText: err.message,
      });
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
