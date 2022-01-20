import {
  ZoomGroup,
  ZoomRole,
  ZoomUser,
  ZoomUserSettings,
  ZoomUserSettingsMeetingAuthentication,
  ZoomUserSettingsMeetingSecurity,
  ZoomUserSettingsRecordingAuthentication,
} from '../src/types';

export function getMockUser(partial?: Partial<ZoomUser>): ZoomUser {
  return {
    id: 'sample-id',
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@email.com',
    type: 1,
    pmi: 111,
    timezone: '',
    verified: 1,
    created_at: '2000-01-23T11:23:52Z',
    last_login_time: '2000-10-24T01:31:01Z',
    last_client_version: '5.7.1.543(win)',
    pic_url: 'https://sample.url',
    language: 'en-US',
    phone_number: '',
    status: 'active',
    role_id: '0',
    dept: 'sample-dept',
    group_ids: ['1', '2'],
    host_key: 'sample-host-key',
    account_id: 'sample-account-id',
    account_number: 1234,
    ...partial,
  };
}

export function getMockGroup(partial?: Partial<ZoomGroup>): ZoomGroup {
  return {
    id: 'sample-id',
    name: 'group-name',
    total_members: 420,
    directory_privacy: 2,
    ...partial,
  };
}

export function getMockRole(partial?: Partial<ZoomRole>): ZoomRole {
  return {
    id: 'sample-id',
    name: 'group-name',
    total_members: 420,
    description: 'sample-description',
    ...partial,
  };
}

export function getMockUserSettings(
  partial?: Partial<ZoomUserSettings>,
): Partial<ZoomUserSettings> {
  return {
    schedule_meeting: {
      host_video: false,
      participants_video: false,
      audio_type: 'both',
      join_before_host: false,
      personal_meeting: true,
      use_pmi_for_scheduled_meetings: false,
      use_pmi_for_instant_meetings: false,
      force_pmi_jbh_password: true,
      require_password_for_scheduling_new_meetings: true,
      require_password_for_instant_meetings: true,
      require_password_for_pmi_meetings: 'all',
      pmi_password: '123456',
      pstn_password_protected: true,
      mute_upon_entry: false,
      embed_password_in_join_link: true,
      meeting_password_requirement: {
        length: 0,
        have_letter: false,
        have_number: false,
        have_special_character: false,
        have_upper_and_lower_characters: false,
        only_allow_numeric: false,
        consecutive_characters_length: 0,
        weak_enhance_detection: false,
      },
    },
    in_meeting: {
      e2e_encryption: false,
      chat: true,
      private_chat: true,
      auto_saving_chat: false,
      entry_exit_chime: 'none',
      record_play_voice: false,
      file_transfer: false,
      feedback: true,
      co_host: false,
      polling: false,
      attendee_on_hold: false,
      show_meeting_control_toolbar: false,
      annotation: true,
      remote_control: true,
      non_verbal_feedback: false,
      breakout_room: false,
      closed_caption: false,
      remote_support: false,
      far_end_camera_control: false,
      group_hd: false,
      virtual_background: true,
      virtual_background_settings: {
        enable: true,
        allow_videos: true,
        allow_upload_custom: true,
        files: [],
      },
      custom_data_center_regions: false,
      screen_sharing: true,
      who_can_share_screen: 'host',
      who_can_share_screen_when_someone_is_sharing: 'host',
      waiting_room: false,
      allow_live_streaming: false,
      request_permission_to_unmute_participants: false,
      meeting_reactions: true,
      show_a_join_from_your_browser_link: false,
      allow_participants_to_rename: true,
      allow_participants_chat_with: 4,
      allow_users_save_chats: 3,
      webinar_live_streaming: {},
      webinar_chat: {},
    },
    email_notification: {
      cloud_recording_available_reminder: true,
      jbh_reminder: true,
      cancel_meeting_reminder: true,
      alternative_host_reminder: true,
      schedule_for_reminder: true,
    },
    recording: {
      local_recording: true,
      cloud_recording: true,
      record_speaker_view: true,
      record_gallery_view: false,
      record_audio_file: true,
      save_chat_text: true,
      show_timestamp: false,
      auto_recording: 'none',
      ip_address_access_control: { enable: false },
      host_delete_cloud_recording: true,
      recording_disclaimer: false,
      auto_delete_cmr: false,
      required_password_for_shared_cloud_recordings: true,
      recording_password_requirement: {
        length: 8,
        have_letter: true,
        have_number: true,
        have_special_character: true,
        only_allow_numeric: false,
      },
    },
    telephony: {
      third_party_audio: false,
      audio_conference_info: '',
      show_international_numbers_link: true,
      telephony_regions: { allowed_values: [], selection_value: 'USTB' },
    },
    tsp: {},
    feature: {
      meeting_capacity: 100,
      large_meeting: false,
      webinar: false,
      zoom_events: false,
      cn_meeting: false,
      in_meeting: false,
      zoom_phone: false,
      concurrent_meeting: 'None',
    },
    integration: { linkedin_sales_navigator: false },
    profile: {
      recording_storage_location: { allowed_values: [], value: 'US' },
    },
    audio_conferencing: {
      toll_free_and_fee_based_toll_call: { enable: false },
    },
    ...partial,
  };
}

export function getMockUserSettingsMeetingAuthentication(
  partial?: Partial<ZoomUserSettingsMeetingAuthentication>,
): Partial<ZoomUserSettingsMeetingAuthentication> {
  return {
    meeting_authentication: false,
    authentication_options: [
      {
        id: 'signIn_N0oChUdLTrCZLfk9JXp3Hw',
        name: 'Sign in to Zoom',
        type: 'enforce_login',
        default_option: true,
        visible: true,
      },
    ],
    ...partial,
  };
}

export function getMockUserSettingsRecordingAuthentication(
  partial?: Partial<ZoomUserSettingsRecordingAuthentication>,
): Partial<ZoomUserSettingsRecordingAuthentication> {
  return {
    recording_authentication: false,
    authentication_options: [
      {
        id: 'signIn_N0oChUdLTrCZLfk9JXp3Hw',
        name: 'Sign in to Zoom',
        type: 'enforce_login',
        default_option: true,
        visible: true,
      },
    ],
    ...partial,
  };
}

export function getMockUserSettingsMeetingSecurity(
  partial?: Partial<ZoomUserSettingsMeetingSecurity>,
): Partial<ZoomUserSettingsMeetingSecurity> {
  return {
    meeting_security: {
      auto_security: true,
      waiting_room: false,
      waiting_room_settings: { participants_to_place_in_waiting_room: 0 },
      meeting_password: true,
      require_password_for_scheduled_meeting: false,
      pmi_password: true,
      password_for_pmi: '123123',
      phone_password: true,
      meeting_password_requirement: {
        length: 0,
        have_letter: false,
        have_number: false,
        have_special_character: false,
        have_upper_and_lower_characters: false,
        only_allow_numeric: false,
        consecutive_characters_length: 0,
        weak_enhance_detection: false,
      },
      embed_password_in_join_link: true,
      approved_or_denied_countries_or_regions: { enable: false },
      block_user_domain: false,
    },
    ...partial,
  };
}
