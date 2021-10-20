import { Entity } from '@jupiterone/integration-sdk-core';
import {
  getMockUserSettings,
  getMockUserSettingsMeetingAuthentication,
  getMockUserSettingsMeetingSecurity,
  getMockUserSettingsRecordingAuthentication,
} from '../../../test/mocks';
import { createUserSettingsEntity } from './converters';

describe('#createUserSettingsEntity', () => {
  test('should convert to entity', () => {
    expect(
      createUserSettingsEntity({
        user: { id: 'test-id' } as Entity,
        userSettings: getMockUserSettings(),
        meetingAuthenticationSettings: getMockUserSettingsMeetingAuthentication(),
        recordingAuthenticationSettings: getMockUserSettingsRecordingAuthentication(),
        meetingSecuritySettings: getMockUserSettingsMeetingSecurity(),
      }),
    ).toMatchSnapshot();
  });
});
