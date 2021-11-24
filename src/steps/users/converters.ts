import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import {
  ZoomUser,
  ZoomUserSettings,
  ZoomUserSettingsMeetingAuthentication,
  ZoomUserSettingsMeetingSecurity,
  ZoomUserSettingsRecordingAuthentication,
} from '../../types';

export function getUserKey(id: string): string {
  return `zoom_user:${id}`;
}

export function createUserEntity({
  user,
  userSettings,
  meetingAuthenticationSettings,
  recordingAuthenticationSettings,
  meetingSecuritySettings,
}: {
  user: ZoomUser;
  userSettings: ZoomUserSettings | undefined;
  meetingAuthenticationSettings:
    | ZoomUserSettingsMeetingAuthentication
    | undefined;
  recordingAuthenticationSettings:
    | ZoomUserSettingsRecordingAuthentication
    | undefined;
  meetingSecuritySettings: ZoomUserSettingsMeetingSecurity | undefined;
}) {
  let userSettingsProps = {};
  if (userSettings) {
    userSettingsProps = {
      scheduleMeetingHostVideo: userSettings.schedule_meeting?.host_video,
      scheduleMeetingParticipantsVideo:
        userSettings.schedule_meeting?.participants_video,
      scheduleMeetingAudioType: userSettings.schedule_meeting?.audio_type,
      scheduleMeetingJoinBeforeHost:
        userSettings.schedule_meeting?.join_before_host,
      scheduleMeetingForcePmiJbhPassword:
        userSettings.schedule_meeting?.force_pmi_jbh_password,
      scheduleMeetingPstnPasswordProtected:
        userSettings.schedule_meeting?.pstn_password_protected,
      scheduleMeetingUsePmiForScheduledMeetings:
        userSettings.schedule_meeting?.use_pmi_for_scheduled_meetings,
      scheduleMeetingUsePmiForInstantMeetings:
        userSettings.schedule_meeting?.use_pmi_for_instant_meetings,
      scheduleMeetingRequirePasswordForScheduledmeetings:
        userSettings.schedule_meeting?.require_password_for_scheduled_meetings,
      scheduleMeetingDefaultPasswordForScheduledMeetings:
        userSettings.schedule_meeting?.default_password_for_scheduled_meetings,
      scheduleMeetingRequirePasswordForInstantMeetings:
        userSettings.schedule_meeting?.require_password_for_instant_meetings,
      scheduleMeetingRequirePasswordForPmiMeetings:
        userSettings.schedule_meeting?.require_password_for_pmi_meetings,
      scheduleMeetingPmiPassword: userSettings.schedule_meeting?.pmi_password,
      scheduleMeetingEmbedPasswordInJoinLink:
        userSettings.schedule_meeting?.embed_password_in_join_link,
      scheduleMeetingMeetingPasswordRequirementLength:
        userSettings.schedule_meeting?.meeting_password_requirement?.length,
      scheduleMeetingMeetingPasswordRequirementHaveLetter:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.have_letter,
      scheduleMeetingMeetingPasswordRequirementHaveNumber:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.have_number,
      scheduleMeetingMeetingPasswordRequirementHaveSpecialCharacter:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.have_special_character,
      scheduleMeetingMeetingPasswordRequirementOnlyAllowNumeric:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.only_allow_numeric,
      scheduleMeetingMeetingPasswordRequirementHaveUpperAndLowerCharacters:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.have_upper_and_lower_characters,
      scheduleMeetingMeetingPasswordRequirementConsecutiveCharactersLength:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.consecutive_characters_length,
      scheduleMeetingMeetingPasswordRequirementWeakEnhanceDetection:
        userSettings.schedule_meeting?.meeting_password_requirement
          ?.weak_enhance_detection,
      scheduleMeetingPersonalMeeting:
        userSettings.schedule_meeting?.personal_meeting,
      scheduleMeetingRequirePasswordForSchedulingNewMeetings:
        userSettings.schedule_meeting
          ?.require_password_for_scheduling_new_meetings,
      scheduleMeetingMuteUponEntry:
        userSettings.schedule_meeting?.mute_upon_entry,

      inMeetingAttendeeOnHold: userSettings.in_meeting?.attendee_on_hold,
      inMeetingE2eEncryption: userSettings.in_meeting?.e2e_encryption,
      inMeetingChat: userSettings.in_meeting?.chat,
      inMeetingAllowParticipantsChatWith:
        userSettings.in_meeting?.allow_participants_chat_with,
      inMeetingAllowUsersSaveChats:
        userSettings.in_meeting?.allow_users_save_chats,
      inMeetingPrivateChat: userSettings.in_meeting?.private_chat,
      inMeetingAutoSavingChat: userSettings.in_meeting?.auto_saving_chat,
      inMeetingEntryExitChime: userSettings.in_meeting?.entry_exit_chime,
      inMeetingRecordPlayVoice: userSettings.in_meeting?.record_play_voice,
      inMeetingFeedbacl: userSettings.in_meeting?.feedback,
      inMeetingCoHost: userSettings.in_meeting?.co_host,
      inMeetingPolling: userSettings.in_meeting?.polling,
      inMeetingAnnotation: userSettings.in_meeting?.annotation,
      inMeetingRemoteControl: userSettings.in_meeting?.remote_control,
      inMeetingNonVerbalFeedback: userSettings.in_meeting?.non_verbal_feedback,
      inMeetingBreakoutRoom: userSettings.in_meeting?.breakout_room,
      inMeetingBreakoutRoomSchedule:
        userSettings.in_meeting?.breakout_room_schedule,
      inMeetingRemoteSupport: userSettings.in_meeting?.remote_support,
      inMeetingClosedCaption: userSettings.in_meeting?.closed_caption,
      inMeetingGroupHd: userSettings.in_meeting?.group_hd,
      inMeetingVirtualBackground: userSettings.in_meeting?.virtual_background,
      inMeetingVirtualBackgroundSettingsEnable:
        userSettings.in_meeting?.virtual_background_settings?.enable,
      inMeetingVirtualBackgroundSettingsAllowVideos:
        userSettings.in_meeting?.virtual_background_settings?.allow_videos,
      inMeetingVirtualBackgroundSettingsAllowUploadCustom:
        userSettings.in_meeting?.virtual_background_settings
          ?.allow_upload_custom,
      inMeetingFarEndCameraControl:
        userSettings.in_meeting?.far_end_camera_control,
      inMeetingShareDualCamera: userSettings.in_meeting?.share_dual_camera,
      inMeetingWaitingRoom: userSettings.in_meeting?.waiting_room,
      inMeetingAllowLiveStreaming:
        userSettings.in_meeting?.allow_live_streaming,
      inMeetingLiveStreamingFacebook:
        userSettings.in_meeting?.live_streaming_facebook,
      inMeetingWorkplaceByFacebook:
        userSettings.in_meeting?.workplace_by_facebook,
      inMeetingLiveStreamingYoutube:
        userSettings.in_meeting?.live_streaming_youtube,
      inMeetingCustomLiveStreamingService:
        userSettings.in_meeting?.custom_live_streaming_service,
      inMeetingCustomServiceInstructions:
        userSettings.in_meeting?.custom_service_instructions,
      inMeetingShowMeetingControlToolbar:
        userSettings.in_meeting?.show_meeting_control_toolbar,
      inMeetingCustomDataCenterRegions:
        userSettings.in_meeting?.custom_data_center_regions,
      inMeetingDataCenterRegions: userSettings.in_meeting?.data_center_regions,
      inMeetingMeetingReactions: userSettings.in_meeting?.meeting_reactions,
      inMeetingScreenSharing: userSettings.in_meeting?.screen_sharing,
      inMeetingWhoCanShareScreen: userSettings.in_meeting?.who_can_share_screen,
      inMeetingWhoCanShareScreenWhenSomeoneIsSharing:
        userSettings.in_meeting?.who_can_share_screen_when_someone_is_sharing,
      inMeetingFileTransfer: userSettings.in_meeting?.file_transfer,
      inMeetingRequestPermissionToUnmute:
        userSettings.in_meeting?.request_permission_to_unmute,
      inMeetingAllowParticipantsToRename:
        userSettings.in_meeting?.allow_participants_to_rename,
      inMeetingRequestPermissionToUnmuteParticipants:
        userSettings.in_meeting?.request_permission_to_unmute_participants,
      inMeetingShowAJoinFromYourBrowserLink:
        userSettings.in_meeting?.show_a_join_from_your_browser_link,
      inMeetingJoinFromMobile: userSettings.in_meeting?.join_from_mobile,
      inMeetingJoinFromDesktop: userSettings.in_meeting?.join_from_desktop,
      inMeetingWebinarLiveStreamingEnable:
        userSettings.in_meeting?.webinar_live_streaming?.enable,
      inMeetingWebinarLiveStreamingLiveStreamingService:
        userSettings.in_meeting?.webinar_live_streaming?.live_streaming_service,
      inMeetingWebinarLiveStreamingCustomServiceInstructions:
        userSettings.in_meeting?.webinar_live_streaming
          ?.custom_service_instructions,
      inMeetingWebinarLiveStreamingLiveStreamingReminder:
        userSettings.in_meeting?.webinar_live_streaming
          ?.live_streaming_reminder,
      inMeetingWebinarChatEnable: userSettings.in_meeting?.webinar_chat?.enable,
      inMeetingWebinarChatAllowPanelistsChatWith:
        userSettings.in_meeting?.webinar_chat?.allow_panelists_chat_with,
      inMeetingWebinarChatAllowAttendeesChatWith:
        userSettings.in_meeting?.webinar_chat?.allow_attendees_chat_with,
      inMeetingWebinarChatDefaultAttendeesChatWith:
        userSettings.in_meeting?.webinar_chat?.default_attendees_chat_with,
      inMeetingWebinarChatAllowPanelistsSendDirectMessage:
        userSettings.in_meeting?.webinar_chat
          ?.allow_panelists_send_direct_message,
      inMeetingWebinarChatAllowUsersSaveChats:
        userSettings.in_meeting?.webinar_chat?.allow_users_save_chats,
      inMeetingWebinarChatAllowAutoSaveLocalChatFile:
        userSettings.in_meeting?.webinar_chat?.allow_auto_save_local_chat_file,

      emailNotificationCloudRecordingAvailableReminder:
        userSettings.email_notification?.cloud_recording_available_reminder,
      emailNotificationJbhReminder:
        userSettings.email_notification?.jbh_reminder,
      emailNotificationCancelMeetingReminder:
        userSettings.email_notification?.cancel_meeting_reminder,
      emailNotificationAlternativeHostReminder:
        userSettings.email_notification?.alternative_host_reminder,
      emailNotificationScheduleForReminder:
        userSettings.email_notification?.schedule_for_reminder,

      recordingLocalRecording: userSettings.recording?.local_recording,
      recordingCloudRecording: userSettings.recording?.cloud_recording,
      recordingRecordSpeakerView: userSettings.recording?.record_speaker_view,
      recordingRecordGalleryView: userSettings.recording?.record_gallery_view,
      recordingRecordAudioFile: userSettings.recording?.record_audio_file,
      recordingSaveChatText: userSettings.recording?.save_chat_text,
      recordingShowTimestamp: userSettings.recording?.show_timestamp,
      recordingRecordingAudioTranscript:
        userSettings.recording?.recording_audio_transcript,
      recordingAutoRecording: userSettings.recording?.auto_recording,
      recordingHostPauseStopRecording:
        userSettings.recording?.host_pause_stop_recording,
      recordingAutoDeleteCmr: userSettings.recording?.auto_delete_cmr,
      recordingAutoDeleteCmrData: userSettings.recording?.auto_delete_cmr_data,
      recordingHostDeleteCloudRecording:
        userSettings.recording?.host_delete_cloud_recording,
      recordingRequirePasswordForSharedCloudRecordings:
        userSettings.recording?.required_password_for_shared_cloud_recordings,
      recordingRecordingDisclaimer:
        userSettings.recording?.recording_disclaimer,
      recordingAskParticipantsToConsentDisclaimer:
        userSettings.recording?.ask_participants_to_consent_disclaimer,
      recordingAskHostToConfirmDisclaimer:
        userSettings.recording?.ask_host_to_confirm_disclaimer,
      recordingRecordingPasswordRequirementLength:
        userSettings.recording?.recording_password_requirement?.length,
      recordingRecordingPasswordRequirementHaveLetter:
        userSettings.recording?.recording_password_requirement?.have_letter,
      recordingRecordingPasswordRequirementHaveNumber:
        userSettings.recording?.recording_password_requirement?.have_number,
      recordingRecordingPasswordRequirementHaveSpecialCharacter:
        userSettings.recording?.recording_password_requirement
          ?.have_special_character,
      recordingRecordingPasswordRequirementOnlyAllowNumeric:
        userSettings.recording?.recording_password_requirement
          ?.only_allow_numeric,
      recordingIpAddressAccessControlEnable:
        userSettings.recording?.ip_address_access_control?.enable,
      recordingIpAddressAccessControlIpAddressesOrRanges:
        userSettings.recording?.ip_address_access_control
          ?.ip_addresses_or_ranges,

      telephonyThirdPartyAudio: userSettings.telephony?.third_party_audio,
      telephonyAudioConferenceInfo:
        userSettings.telephony?.audio_conference_info,
      telephonyShowInternationalNumbersLink:
        userSettings.telephony?.show_international_numbers_link,
      telephonyTelephonyRegionsAllowedValues:
        userSettings.telephony?.telephony_regions?.allowed_values,
      telephonyTelephonyRegionsSelectionValue:
        userSettings.telephony?.telephony_regions?.selection_value,

      featureMeetingCapacity: userSettings.feature?.meeting_capacity,
      featureLargeMeeting: userSettings.feature?.large_meeting,
      featureLargeMeetingCapacity: userSettings.feature?.large_meeting_capacity,
      featureWebinar: userSettings.feature?.webinar,
      featureWebinarCapacity: userSettings.feature?.webinar_capacity,
      featureZoomEvents: userSettings.feature?.zoom_events,
      featureZoomEventsCapacity: userSettings.feature?.zoom_events_capacity,
      featureCnMeeting: userSettings.feature?.cn_meeting,
      featureInMeeting: userSettings.feature?.in_meeting,
      featureZoomPhone: userSettings.feature?.zoom_phone,
      featureConcurrentMeeting: userSettings.feature?.concurrent_meeting,

      tspCallOut: userSettings.tsp?.call_out,
      tspCallOutCountries: userSettings.tsp?.call_out_countries,
      tspShowInternationalNumbersLink:
        userSettings.tsp?.show_international_numbers_link,

      profileRecordingStorageLocationAllowedValues:
        userSettings.profile?.recording_storage_location?.allowed_values,
      profileRecordingStorageLocationValue:
        userSettings.profile?.recording_storage_location?.value,

      audioConferencingTollFreeAndFeeBasedTollCallEnable:
        userSettings.audio_conferencing?.toll_free_and_fee_based_toll_call
          ?.enable,
      audioConferencingTollFreeAndFeeBasedTollCallAllowWebinarAttendeesDial:
        userSettings.audio_conferencing?.toll_free_and_fee_based_toll_call
          ?.allow_webinar_attendees_dial,
    };
  }

  let meetingAuthenticationSettingsProps = {};
  if (meetingAuthenticationSettings) {
    meetingAuthenticationSettingsProps = {
      meetingAuthentication:
        meetingAuthenticationSettings.meeting_authentication,
    };
  }

  let recordingAuthenticationSettingsProps = {};
  if (recordingAuthenticationSettings) {
    recordingAuthenticationSettingsProps = {
      recordingAuthentication:
        recordingAuthenticationSettings.recording_authentication,
    };
  }

  let meetingSecuritySettingsProps = {};
  if (meetingSecuritySettings) {
    meetingSecuritySettingsProps = {
      meetingSecurityEmbedPasswordInJoinLink:
        meetingSecuritySettings.meeting_security?.embed_password_in_join_link,
      meetingSecurityEndToEndEncryptedMeetings:
        meetingSecuritySettings.meeting_security?.end_to_end_encrypted_meetings,
      meetingSecurityEncryptionType:
        meetingSecuritySettings.meeting_security?.encryption_type,
      meetingSecurityMeetingPassword:
        meetingSecuritySettings.meeting_security?.meeting_password,
      meetingSecurityMeetingPasswordRequirementLength:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.length,
      meetingSecurityMeetingPasswordRequirementHaveLetter:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.have_letter,
      meetingSecurityMeetingPasswordRequirementHaveNumber:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.have_number,
      meetingSecurityMeetingPasswordRequirementHaveSpecialCharacter:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.have_special_character,
      meetingSecurityMeetingPasswordRequirementOnlyAllowNumeric:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.only_allow_numeric,
      meetingSecurityMeetingPasswordRequirementHaveUpperAndLowerCharacters:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.have_upper_and_lower_characters,
      meetingSecurityMeetingPasswordRequirementConsecutiveCharactersLength:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.consecutive_characters_length,
      meetingSecurityMeetingPasswordRequirementWeakEnhanceDetection:
        meetingSecuritySettings.meeting_security?.meeting_password_requirement
          ?.weak_enhance_detection,
      meetingSecurityPhonePassword:
        meetingSecuritySettings.meeting_security?.phone_password,
      meetingSecurityPmiPassword:
        meetingSecuritySettings.meeting_security?.pmi_password,
      meetingSecurityPasswordForPmi:
        meetingSecuritySettings.meeting_security?.password_for_pmi,
      meetingSecurityRequirePasswordForScheduledMeeting:
        meetingSecuritySettings.meeting_security
          ?.require_password_for_scheduled_meeting,
      meetingSecurityWebinarPassword:
        meetingSecuritySettings.meeting_security?.webinar_password,
      meetingSecurityRequirePasswordForScheduledWebinar:
        meetingSecuritySettings.meeting_security
          ?.require_password_for_scheduled_webinar,
      meetingSecurityWaitingRoom:
        meetingSecuritySettings.meeting_security?.waiting_room,
      meetingSecurityWaitingRoomSettingsParticipantsToPlaceInWaitingRoom:
        meetingSecuritySettings.meeting_security?.waiting_room_settings
          ?.participants_to_place_in_waiting_room,
      meetingSecurityWaitingRoomSettingsWhitelistedDomainsForWaitingRoom:
        meetingSecuritySettings.meeting_security?.waiting_room_settings
          ?.whitelisted_domains_for_waiting_room,
      meetingSecurityWaitingRoomSettingsUsersWhoCanAdmitParticipantsFromWaitingRoom:
        meetingSecuritySettings.meeting_security?.waiting_room_settings
          ?.users_who_can_admit_participants_from_waiting_room,
      meetingSecurityAutoSecurity:
        meetingSecuritySettings.meeting_security?.auto_security,
      meetingSecurityBlockUserDomain:
        meetingSecuritySettings.meeting_security?.block_user_domain,
      meetingSecurityBlockUserDomainList:
        meetingSecuritySettings.meeting_security?.block_user_domain_list,
      meetingSecurityApprovedOrDeniedCountriesOrRegionsEnable:
        meetingSecuritySettings.meeting_security
          ?.approved_or_denied_countries_or_regions.enable,
    };
  }

  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _class: Entities.USER._class,
        _type: Entities.USER._type,
        _key: getUserKey(user.id),
        username: user.email,
        name: `${user.first_name} ${user.last_name}`,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        type: user.type,
        pmi: user.pmi,
        timezone: user.timezone,
        verified: user.verified,
        createdAt: user.created_at,
        lastLoginTime: user.last_login_time,
        lastClientVersion: user.last_client_version,
        picUrl: user.pic_url,
        language: user.language,
        phoneNumber: user.phone_number,
        status: user.status,
        roleId: user.role_id,
        dept: user.dept,
        groupIds: user.group_ids,
        hostKey: user.host_key,

        ...userSettingsProps,
        ...meetingAuthenticationSettingsProps,
        ...recordingAuthenticationSettingsProps,
        ...meetingSecuritySettingsProps,
      },
    },
  });
}
