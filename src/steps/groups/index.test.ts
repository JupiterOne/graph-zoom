import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig } from '../../config';
import {
  buildUserAndGroupsRelationship,
  buildAccountAndGroupsRelationship,
  fetchGroups,
} from '.';
import { integrationConfig } from '../../../test/config';
import { setupZoomRecording } from '../../../test/recording';
import { fetchUsers } from '../users';
import { Relationships } from '../constants';
import { fetchAccount } from '../account';

describe('#fetchGroups', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'fetchGroups',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchGroups(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
    }).toMatchSnapshot();

    const groups = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_group'),
    );
    expect(groups.length).toBeGreaterThan(0);
    expect(groups).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_group' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          directoryPrivacy: { type: 'number' },
        },
      },
    });
  });
});

describe('#buildUserAndGroupsRelationship', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'buildUserAndGroupsRelationship',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should build group and user relationship', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);
    await fetchGroups(context);
    await buildUserAndGroupsRelationship(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
      collectedRelationships: context.jobState.collectedRelationships,
    }).toMatchSnapshot();

    const users = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_user'),
    );
    expect(users.length).toBeGreaterThan(0);
    expect(users).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_user' },
          name: { type: 'string' },
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          type: { type: 'number' },
          pmi: { type: 'number' },
          timezone: { type: 'string' },
          verified: { type: 'number' },
          createdAt: { type: 'string' },
          lastLoginTime: { type: 'string' },
          lastClientVersion: { type: 'string' },
          picUrl: { type: 'string' },
          language: { type: 'string' },
          phoneNumber: { type: 'string' },
          status: { type: 'string' },
          roleId: { type: 'string' },
          dept: { type: 'string' },
          groupIds: {
            type: 'array',
            items: { type: 'string' },
          },
          hostKey: { type: 'string' },
          scheduleMeetingHostVideo: { type: 'boolean' },
          scheduleMeetingParticipantsVideo: { type: 'boolean' },
          scheduleMeetingAudioType: { type: 'string' },
          scheduleMeetingJoinBeforeHost: { type: 'boolean' },
          scheduleMeetingForcePmiJbhPassword: { type: 'boolean' },
          scheduleMeetingPstnPasswordProtected: { type: 'boolean' },
          scheduleMeetingUsePmiForScheduledMeetings: { type: 'boolean' },
          scheduleMeetingUsePmiForInstantMeetings: { type: 'boolean' },
          scheduleMeetingRequirePasswordForScheduledmeetings: {
            type: 'boolean',
          },
          scheduleMeetingDefaultPasswordForScheduledMeetings: {
            type: 'boolean',
          },
          scheduleMeetingRequirePasswordForInstantMeetings: { type: 'boolean' },
          scheduleMeetingRequirePasswordForPmiMeetings: { type: 'string' },
          scheduleMeetingPmiPassword: { type: 'string' },
          scheduleMeetingEmbedPasswordInJoinLink: { type: 'boolean' },
          scheduleMeetingMeetingPasswordRequirementLength: { type: 'number' },
          scheduleMeetingMeetingPasswordRequirementHaveLetter: {
            type: 'boolean',
          },
          scheduleMeetingMeetingPasswordRequirementHaveNumber: {
            type: 'boolean',
          },
          scheduleMeetingMeetingPasswordRequirementHaveSpecialCharacter: {
            type: 'boolean',
          },
          scheduleMeetingMeetingPasswordRequirementOnlyAllowNumeric: {
            type: 'boolean',
          },
          scheduleMeetingMeetingPasswordRequirementHaveUpperAndLowerCharacters: {
            type: 'boolean',
          },
          scheduleMeetingMeetingPasswordRequirementConsecutiveCharactersLength: {
            type: 'number',
          },
          scheduleMeetingMeetingPasswordRequirementWeakEnhanceDetection: {
            type: 'boolean',
          },
          scheduleMeetingPersonalMeeting: { type: 'boolean' },
          scheduleMeetingRequirePasswordForSchedulingNewMeetings: {
            type: 'boolean',
          },
          scheduleMeetingMuteUponEntry: { type: 'boolean' },
          inMeetingAttendeeOnHold: { type: 'boolean' },
          inMeetingE2eEncryption: { type: 'boolean' },
          inMeetingChat: { type: 'boolean' },
          inMeetingAllowParticipantsChatWith: { type: 'number' },
          inMeetingAllowUsersSaveChats: { type: 'number' },
          inMeetingPrivateChat: { type: 'boolean' },
          inMeetingAutoSavingChat: { type: 'boolean' },
          inMeetingEntryExitChime: { type: 'string' },
          inMeetingRecordPlayVoice: { type: 'boolean' },
          inMeetingFeedbacl: { type: 'boolean' },
          inMeetingCoHost: { type: 'boolean' },
          inMeetingPolling: { type: 'boolean' },
          inMeetingAnnotation: { type: 'boolean' },
          inMeetingRemoteControl: { type: 'boolean' },
          inMeetingNonVerbalFeedback: { type: 'boolean' },
          inMeetingBreakoutRoom: { type: 'boolean' },
          inMeetingBreakoutRoomSchedule: { type: 'boolean' },
          inMeetingRemoteSupport: { type: 'boolean' },
          inMeetingClosedCaption: { type: 'boolean' },
          inMeetingGroupHd: { type: 'boolean' },
          inMeetingVirtualBackground: { type: 'boolean' },
          inMeetingVirtualBackgroundSettingsEnable: { type: 'boolean' },
          inMeetingVirtualBackgroundSettingsAllowVideos: { type: 'boolean' },
          inMeetingVirtualBackgroundSettingsAllowUploadCustom: {
            type: 'boolean',
          },
          inMeetingFarEndCameraControl: { type: 'boolean' },
          inMeetingShareDualCamera: { type: 'boolean' },
          inMeetingWaitingRoom: { type: 'boolean' },
          inMeetingAllowLiveStreaming: { type: 'boolean' },
          inMeetingLiveStreamingFacebook: { type: 'boolean' },
          inMeetingWorkplaceByFacebook: { type: 'boolean' },
          inMeetingLiveStreamingYoutube: { type: 'boolean' },
          inMeetingCustomLiveStreamingService: { type: 'boolean' },
          inMeetingCustomServiceInstructions: { type: 'string' },
          inMeetingShowMeetingControlToolbar: { type: 'boolean' },
          inMeetingCustomDataCenterRegions: { type: 'boolean' },
          inMeetingDataCenterRegions: {
            type: 'array',
            items: { type: 'string' },
          },
          inMeetingMeetingReactions: { type: 'boolean' },
          inMeetingScreenSharing: { type: 'boolean' },
          inMeetingWhoCanShareScreen: { type: 'string' },
          inMeetingWhoCanShareScreenWhenSomeoneIsSharing: { type: 'string' },
          inMeetingFileTransfer: { type: 'boolean' },
          inMeetingRequestPermissionToUnmute: { type: 'boolean' },
          inMeetingAllowParticipantsToRename: { type: 'boolean' },
          inMeetingRequestPermissionToUnmuteParticipants: { type: 'boolean' },
          inMeetingShowAJoinFromYourBrowserLink: { type: 'boolean' },
          inMeetingJoinFromMobile: { type: 'boolean' },
          inMeetingJoinFromDesktop: { type: 'boolean' },
          inMeetingWebinarLiveStreamingEnable: { type: 'boolean' },
          inMeetingWebinarLiveStreamingLiveStreamingService: {
            type: 'array',
            items: { type: 'string' },
          },
          inMeetingWebinarLiveStreamingCustomServiceInstructions: {
            type: 'string',
          },
          inMeetingWebinarLiveStreamingLiveStreamingReminder: {
            type: 'boolean',
          },
          inMeetingWebinarChatEnable: { type: 'boolean' },
          inMeetingWebinarChatAllowPanelistsChatWith: { type: 'number' },
          inMeetingWebinarChatAllowAttendeesChatWith: { type: 'number' },
          inMeetingWebinarChatDefaultAttendeesChatWith: { type: 'number' },
          inMeetingWebinarChatAllowPanelistsSendDirectMessage: {
            type: 'boolean',
          },
          inMeetingWebinarChatAllowUsersSaveChats: { type: 'number' },
          inMeetingWebinarChatAllowAutoSaveLocalChatFile: { type: 'boolean' },
          emailNotificationCloudRecordingAvailableReminder: { type: 'boolean' },
          emailNotificationJbhReminder: { type: 'boolean' },
          emailNotificationCancelMeetingReminder: { type: 'boolean' },
          emailNotificationAlternativeHostReminder: { type: 'boolean' },
          emailNotificationScheduleForReminder: { type: 'boolean' },
          recordingLocalRecording: { type: 'boolean' },
          recordingCloudRecording: { type: 'boolean' },
          recordingRecordSpeakerView: { type: 'boolean' },
          recordingRecordGalleryView: { type: 'boolean' },
          recordingRecordAudioFile: { type: 'boolean' },
          recordingSaveChatText: { type: 'boolean' },
          recordingShowTimestamp: { type: 'boolean' },
          recordingRecordingAudioTranscript: { type: 'boolean' },
          recordingAutoRecording: { type: 'string' },
          recordingHostPauseStopRecording: { type: 'boolean' },
          recordingAutoDeleteCmr: { type: 'boolean' },
          recordingAutoDeleteCmrData: { type: 'number' },
          recordingHostDeleteCloudRecording: { type: 'boolean' },
          recordingRequirePasswordForSharedCloudRecordings: { type: 'boolean' },
          recordingRecordingDisclaimer: { type: 'boolean' },
          recordingAskParticipantsToConsentDisclaimer: { type: 'boolean' },
          recordingAskHostToConfirmDisclaimer: { type: 'boolean' },
          recordingRecordingPasswordRequirementLength: { type: 'number' },
          recordingRecordingPasswordRequirementHaveLetter: { type: 'boolean' },
          recordingRecordingPasswordRequirementHaveNumber: { type: 'boolean' },
          recordingRecordingPasswordRequirementHaveSpecialCharacter: {
            type: 'boolean',
          },
          recordingRecordingPasswordRequirementOnlyAllowNumeric: {
            type: 'boolean',
          },
          recordingIpAddressAccessControlEnable: { type: 'boolean' },
          recordingIpAddressAccessControlIpAddressesOrRanges: {
            type: 'string',
          },
          telephonyThirdPartyAudio: { type: 'boolean' },
          telephonyAudioConferenceInfo: { type: 'string' },
          telephonyShowInternationalNumbersLink: { type: 'boolean' },
          telephonyTelephonyRegionsAllowedValues: {
            type: 'array',
            items: { type: 'string' },
          },
          telephonyTelephonyRegionsSelectionValue: { type: 'string' },
          featureMeetingCapacity: { type: 'number' },
          featureLargeMeeting: { type: 'boolean' },
          featureLargeMeetingCapacity: { type: 'number' },
          featureWebinar: { type: 'boolean' },
          featureWebinarCapacity: { type: 'number' },
          featureZoomEvents: { type: 'boolean' },
          featureZoomEventsCapacity: { type: 'number' },
          featureCnMeeting: { type: 'boolean' },
          featureInMeeting: { type: 'boolean' },
          featureZoomPhone: { type: 'boolean' },
          featureConcurrentMeeting: { type: 'string' },
          tspCallOut: { type: 'boolean' },
          tspCallOutCountries: { type: 'array', items: { type: 'string' } },
          tspShowInternationalNumbersLink: { type: 'boolean' },
          profileRecordingStorageLocationAllowedValues: {
            type: 'array',
            items: { type: 'string' },
          },
          profileRecordingStorageLocationValue: { type: 'string' },
          audioConferencingTollFreeAndFeeBasedTollCallEnable: {
            type: 'boolean',
          },
          audioConferencingTollFreeAndFeeBasedTollCallAllowWebinarAttendeesDial: {
            type: 'boolean',
          },
          meetingAuthentication: { type: 'boolean' },
          recordingAuthentication: { type: 'boolean' },

          meetingSecurityEmbedPasswordInJoinLink: { type: 'boolean' },
          meetingSecurityEndToEndEncryptedMeetings: { type: 'boolean' },
          meetingSecurityEncryptionType: { type: 'string' },
          meetingSecurityMeetingPassword: { type: 'boolean' },
          meetingSecurityMeetingPasswordRequirementLength: { type: 'number' },
          meetingSecurityMeetingPasswordRequirementHaveLetter: {
            type: 'boolean',
          },
          meetingSecurityMeetingPasswordRequirementHaveNumber: {
            type: 'boolean',
          },
          meetingSecurityMeetingPasswordRequirementHaveSpecialCharacter: {
            type: 'boolean',
          },
          meetingSecurityMeetingPasswordRequirementOnlyAllowNumeric: {
            type: 'boolean',
          },
          meetingSecurityMeetingPasswordRequirementHaveUpperAndLowerCharacters: {
            type: 'boolean',
          },
          meetingSecurityMeetingPasswordRequirementConsecutiveCharactersLength: {
            type: 'number',
          },
          meetingSecurityMeetingPasswordRequirementWeakEnhanceDetection: {
            type: 'boolean',
          },
          meetingSecurityPhonePassword: { type: 'boolean' },
          meetingSecurityPasswordForPmi: { type: 'string' },
          meetingSecurityPmiPassword: { type: 'boolean' },
          meetingSecurityRequirePasswordForScheduledMeeting: {
            type: 'boolean',
          },
          meetingSecurityWebinarPassword: { type: 'boolean' },
          meetingSecurityRequirePasswordForScheduledWebinar: {
            type: 'boolean',
          },
          meetingSecurityWaitingRoom: { type: 'boolean' },
          meetingSecurityWaitingRoomSettingsParticipantsToPlaceInWaitingRoom: {
            type: 'number',
          },
          meetingSecurityWaitingRoomSettingsWhitelistedDomainsForWaitingRoom: {
            type: 'string',
          },
          meetingSecurityWaitingRoomSettingsUsersWhoCanAdmitParticipantsFromWaitingRoom: {
            type: 'number',
          },
          meetingSecurityAutoSecurity: { type: 'boolean' },
          meetingSecurityBlockUserDomain: { type: 'boolean' },
          meetingSecurityBlockUserDomainList: {
            type: 'array',
            items: { type: 'string' },
          },
          meetingSecurityApprovedOrDeniedCountriesOrRegionsEnable: {
            type: 'boolean',
          },
        },
      },
    });

    const groups = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_group'),
    );
    expect(groups.length).toBeGreaterThan(0);
    expect(groups).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_group' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          directoryPrivacy: { type: 'number' },
        },
      },
    });

    expect(
      context.jobState.collectedRelationships.filter(
        (e) => e._type === Relationships.GROUP_HAS_USER._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: 'HAS' },
          _type: {
            const: 'zoom_group_has_user',
          },
        },
      },
    });
  });
});

describe('#buildAccountAndGroupsRelationship', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'buildAccountAndGroupsRelationship',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should build group and account relationship', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchAccount(context);
    await fetchGroups(context);
    await buildAccountAndGroupsRelationship(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
      collectedRelationships: context.jobState.collectedRelationships,
    }).toMatchSnapshot();

    const account = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_account'),
    );
    expect(account.length).toBe(1);
    expect(account).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_account' },
          name: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
        },
      },
    });

    const groups = context.jobState.collectedEntities.filter((e) =>
      e._type.includes('zoom_group'),
    );
    expect(groups.length).toBeGreaterThan(0);
    expect(groups).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_group' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
          directoryPrivacy: { type: 'number' },
        },
      },
    });

    expect(
      context.jobState.collectedRelationships.filter(
        (e) => e._type === Relationships.ACCOUNT_HAS_GROUP._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: 'HAS' },
          _type: {
            const: 'zoom_account_has_group',
          },
        },
      },
    });
  });
});
