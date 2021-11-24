export type PageIteratee<T> = (page: T) => Promise<void>;

export type ZoomUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: number;
  pmi: number;
  timezone: string;
  verified: number;
  created_at: string;
  last_login_time: string;
  last_client_version: string;
  pic_url: string;
  language: string;
  phone_number: string;
  status: string;
  role_id: string;
  dept: string;
  group_ids: string[];
  host_key: string;
};

export type ZoomGroup = {
  id: string;
  name: string;
  total_members: number;
  directory_privacy: number;
};

export type ZoomUserSettings = {
  schedule_meeting?: {
    host_video?: boolean;
    participants_video?: boolean;
    audio_type?: string;
    join_before_host?: boolean;
    force_pmi_jbh_password?: boolean;
    pstn_password_protected?: boolean;
    use_pmi_for_scheduled_meetings?: boolean;
    use_pmi_for_instant_meetings?: boolean;
    require_password_for_scheduled_meetings?: boolean;
    default_password_for_scheduled_meetings?: string;
    require_password_for_instant_meetings?: boolean;
    require_password_for_pmi_meetings?: string;
    pmi_password?: string;
    embed_password_in_join_link?: boolean;
    meeting_password_requirement?: {
      length?: number;
      have_letter?: boolean;
      have_number?: boolean;
      have_special_character?: boolean;
      only_allow_numeric?: boolean;
      have_upper_and_lower_characters?: boolean;
      consecutive_characters_length?: number;
      weak_enhance_detection?: boolean;
    };
    personal_meeting?: boolean;
    require_password_for_scheduling_new_meetings?: boolean;
    mute_upon_entry?: boolean;
  };
  in_meeting?: {
    attendee_on_hold?: boolean;
    e2e_encryption?: boolean;
    chat?: boolean;
    allow_participants_chat_with?: number;
    allow_users_save_chats?: number;
    private_chat?: boolean;
    auto_saving_chat?: boolean;
    entry_exit_chime?: string;
    record_play_voice?: boolean;
    feedback?: boolean;
    co_host?: boolean;
    polling?: boolean;
    annotation?: boolean;
    remote_control?: boolean;
    non_verbal_feedback?: boolean;
    breakout_room?: boolean;
    breakout_room_schedule?: boolean;
    remote_support?: boolean;
    closed_caption?: boolean;
    group_hd?: boolean;
    virtual_background?: boolean;
    virtual_background_settings?: {
      enable?: boolean;
      allow_videos?: boolean;
      allow_upload_custom?: boolean;
      files?: {
        id?: string;
        name?: string;
        type?: string;
        is_default?: boolean;
        size?: string;
      }[];
    };
    far_end_camera_control?: boolean;
    share_dual_camera?: boolean;
    waiting_room?: boolean;
    allow_live_streaming?: boolean;
    live_streaming_facebook?: boolean;
    workplace_by_facebook?: boolean;
    live_streaming_youtube?: boolean;
    custom_live_streaming_service?: boolean;
    custom_service_instructions?: string;
    show_meeting_control_toolbar?: boolean;
    custom_data_center_regions?: boolean;
    data_center_regions?: string[];
    meeting_reactions?: boolean;
    screen_sharing?: boolean;
    who_can_share_screen?: string;
    who_can_share_screen_when_someone_is_sharing?: string;
    file_transfer?: boolean;
    request_permission_to_unmute?: boolean;
    allow_participants_to_rename?: boolean;
    request_permission_to_unmute_participants?: boolean;
    show_a_join_from_your_browser_link?: boolean;
    join_from_mobile?: boolean;
    join_from_desktop?: boolean;
    webinar_live_streaming?: {
      enable?: boolean;
      live_streaming_service?: string[];
      custom_service_instructions?: string;
      live_streaming_reminder?: boolean;
    };
    webinar_chat?: {
      enable?: boolean;
      allow_panelists_chat_with?: number;
      allow_attendees_chat_with?: number;
      default_attendees_chat_with?: number;
      allow_panelists_send_direct_message?: boolean;
      allow_users_save_chats?: number;
      allow_auto_save_local_chat_file?: boolean;
    };
  };
  email_notification?: {
    cloud_recording_available_reminder?: boolean;
    jbh_reminder?: boolean;
    cancel_meeting_reminder?: boolean;
    alternative_host_reminder?: boolean;
    schedule_for_reminder?: boolean;
  };
  recording?: {
    local_recording?: boolean;
    cloud_recording?: boolean;
    record_speaker_view?: boolean;
    record_gallery_view?: boolean;
    record_audio_file?: boolean;
    save_chat_text?: boolean;
    show_timestamp?: boolean;
    recording_audio_transcript?: boolean;
    auto_recording?: string;
    host_pause_stop_recording?: boolean;
    auto_delete_cmr?: boolean;
    auto_delete_cmr_data?: number;
    host_delete_cloud_recording?: boolean;
    required_password_for_shared_cloud_recordings?: boolean;
    recording_disclaimer?: boolean;
    ask_participants_to_consent_disclaimer?: boolean;
    ask_host_to_confirm_disclaimer?: boolean;
    recording_password_requirement?: {
      length?: number;
      have_letter?: boolean;
      have_number?: boolean;
      have_special_character?: boolean;
      only_allow_numeric?: boolean;
    };
    ip_address_access_control?: {
      enable?: boolean;
      ip_addresses_or_ranges?: string;
    };
  };
  telephony?: {
    third_party_audio?: boolean;
    audio_conference_info?: string;
    show_international_numbers_link?: boolean;
    telephony_regions?: {
      allowed_values?: string[];
      selection_value?: string;
    };
  };
  feature?: {
    meeting_capacity?: number;
    large_meeting?: boolean;
    large_meeting_capacity?: number;
    webinar?: boolean;
    webinar_capacity?: number;
    zoom_events?: boolean;
    zoom_events_capacity?: number;
    cn_meeting?: boolean;
    in_meeting?: boolean;
    zoom_phone?: boolean;
    concurrent_meeting?: string;
  };
  tsp?: {
    call_out?: boolean;
    call_out_countries?: string[];
    show_international_numbers_link?: boolean;
  };
  profile?: {
    recording_storage_location?: {
      allowed_values?: string[];
      value?: string;
    };
  };
  integration?: {
    linkedin_sales_navigator?: boolean;
  };
  audio_conferencing?: {
    toll_free_and_fee_based_toll_call?: {
      enable?: boolean;
      numbers?: {
        code?: string;
        country_code?: string;
        country_name?: string;
        number?: string;
        display_number?: string;
      }[];
      allow_webinar_attendees_dial?: boolean;
    };
  };
};

export type ZoomUserSettingsMeetingAuthentication = {
  meeting_authentication?: boolean;
  authentication_options?: {
    id?: string;
    name?: string;
    type?: string;
    default_option?: boolean;
    visible?: boolean;
    domains?: string;
  }[];
};

export type ZoomUserSettingsRecordingAuthentication = {
  recording_authentication?: boolean;
  authentication_options?: {
    id?: string;
    name?: string;
    type?: string;
    default_option?: boolean;
    visible?: boolean;
    domains?: string;
  }[];
};

export type ZoomUserSettingsMeetingSecurity = {
  meeting_security?: {
    embed_password_in_join_link?: boolean;
    end_to_end_encrypted_meetings?: boolean;
    encryption_type?: string;
    meeting_password?: boolean;
    meeting_password_requirement?: {
      length?: number;
      have_letter?: boolean;
      have_number?: boolean;
      have_special_character?: boolean;
      only_allow_numeric?: boolean;
      have_upper_and_lower_characters?: boolean;
      consecutive_characters_length?: number;
      weak_enhance_detection?: boolean;
    };
    phone_password?: boolean;
    pmi_password?: boolean;
    password_for_pmi: string;
    require_password_for_scheduled_meeting?: boolean;
    webinar_password?: boolean;
    require_password_for_scheduled_webinar?: boolean;
    waiting_room?: boolean;
    waiting_room_settings?: {
      participants_to_place_in_waiting_room?: number;
      whitelisted_domains_for_waiting_room?: string;
      users_who_can_admit_participants_from_waiting_room?: number;
    };
    auto_security?: boolean;
    block_user_domain?: boolean;
    block_user_domain_list?: string[];
    approved_or_denied_countries_or_regions: {
      enable?: boolean;
    };
  };
};

export type GroupsResponse = {
  total_records: number;
  groups: ZoomGroup[];
};

export type ZoomGroupMember = Pick<
  ZoomUser,
  'id' | 'first_name' | 'last_name' | 'email' | 'type'
>;

export type ZoomRole = {
  id: string;
  name: string;
  description: string;
  total_members: number;
};

export type RolesResponse = {
  total_records: number;
  roles: ZoomRole[];
};

export type ZoomRoleMember = Pick<
  ZoomUser,
  'id' | 'first_name' | 'last_name' | 'email' | 'type'
> & { department: string };

type PaginationData = {
  next_page_token: string;
  page_count: number;
  page_size: number;
  page_number: number;
  total_records: number;
};

export type PaginatedUsers = {
  users: ZoomUser[];
  PaginationData;
} & PaginationData;

export type PaginatedUserInGroupsResponse = {
  members: ZoomGroupMember[];
} & PaginationData;

export type PaginatedUserInRolesResponse = {
  members: ZoomRoleMember[];
} & PaginationData;
