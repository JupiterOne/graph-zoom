import { getMockUser } from '../../../test/mocks';
import { createUserEntity } from './converters';

describe('#createUserEntity', () => {
  test('should convert to entity', () => {
    expect(
      createUserEntity({
        user: getMockUser(),
        userSettings: undefined,
        meetingAuthenticationSettings: undefined,
        meetingSecuritySettings: undefined,
        recordingAuthenticationSettings: undefined,
      }),
    ).toMatchSnapshot();
  });
});
