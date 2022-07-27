import fetch, { Response } from 'node-fetch';
import { retry } from '@lifeomic/attempt';

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

class ResponseError extends IntegrationProviderAPIError {
  response: Response;
  constructor(options) {
    super(options);
    this.response = options.response;
  }
}

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private readonly paginateEntitiesPerPage = 30;

  private authenticationToken: string;

  public authenticationUri(accountId: string): string {
    return `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;
  }

  private withBaseUri(path: string): string {
    return `https://api.zoom.us/v2/${path}`;
  }

  public async initializeAccessToken() {
    const authorizationString =
      this.config.clientId + ':' + this.config.clientSecret;
    const authorizationEncoded = Buffer.from(authorizationString).toString(
      'base64',
    );

    const result = await retry(
      async () => {
        const response = await fetch(
          this.authenticationUri(this.config.accountId),
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${authorizationEncoded}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        if (!response.ok) {
          throw new ResponseError({
            endpoint: this.authenticationUri(this.config.accountId),
            status: response.status,
            statusText: response.statusText,
            response,
          });
        }
        return response;
      },
      {
        delay: 1000,
        factor: 2,
        maxAttempts: 10,
        handleError: (err, context) => {
          const rateLimitType = err.response.headers.get('X-RateLimit-Type');
          // only retry on 429 && per second limit
          if (!(err.status === 429 && rateLimitType === 'QPS')) {
            context.abort();
          }
        },
      },
    );
    const body = await result.json();
    this.authenticationToken = body.access_token;
  }

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    try {
      const result = await retry(
        async () => {
          const response = await fetch(uri, {
            method,
            headers: {
              Authorization: `Bearer ${this.authenticationToken}`,
            },
          });
          if (!response.ok) {
            throw new ResponseError({
              endpoint: uri,
              status: response.status,
              statusText: response.statusText,
              response,
            });
          }
          return response;
        },
        {
          delay: 1000,
          factor: 2,
          maxAttempts: 10,
          handleError: (err, context) => {
            const rateLimitType = err.response.headers.get('X-RateLimit-Type');
            // only retry on 429 && per second limit
            if (!(err.status === 429 && rateLimitType === 'QPS')) {
              context.abort();
            }
          },
        },
      );
      return result;
    } catch (error) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: error.status,
        statusText: error.statusText,
      });
    }
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
  public async getUserSettings(
    userId: string,
  ): Promise<ZoomUserSettings | undefined> {
    try {
      const userSettingsApiRoute = this.withBaseUri(`users/${userId}/settings`);

      const response = await this.request(userSettingsApiRoute, 'GET');
      return response.json();
    } catch (err) {
      return undefined;
    }
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsMeetingAuthentication(
    userId: string,
  ): Promise<ZoomUserSettingsMeetingAuthentication | undefined> {
    try {
      const userSettingsMeetingAuthenticationApiRoute = this.withBaseUri(
        `users/${userId}/settings?option=meeting_authentication`,
      );

      const response = await this.request(
        userSettingsMeetingAuthenticationApiRoute,
        'GET',
      );

      return response.json();
    } catch (err) {
      return undefined;
    }
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsRecordingAuthentication(
    userId: string,
  ): Promise<ZoomUserSettingsRecordingAuthentication | undefined> {
    try {
      const userSettingsRecordingAuthenticationApiRoute = this.withBaseUri(
        `users/${userId}/settings?option=recording_authentication`,
      );

      const response = await this.request(
        userSettingsRecordingAuthenticationApiRoute,
        'GET',
      );
      return response.json();
    } catch (err) {
      return undefined;
    }
  }

  // OAuth scope: 'user:read:admin'
  public async getUserSettingsMeetingSecurity(
    userId: string,
  ): Promise<ZoomUserSettingsMeetingSecurity | undefined> {
    try {
      const userSettingsMeetingSecurityApiRoute = this.withBaseUri(
        `users/${userId}/settings?option=meeting_security`,
      );

      const response = await this.request(
        userSettingsMeetingSecurityApiRoute,
        'GET',
      );
      return response.json();
    } catch (err) {
      return undefined;
    }
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
