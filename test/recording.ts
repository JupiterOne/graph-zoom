import {
  Recording,
  setupRecording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupZoomRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    mutateEntry: (entry) => {
      mutations.unzipGzippedRecordingEntry(entry);

      if (/oauth\/token/.exec(entry.request.url) && entry.response.content) {
        // Redact authentication response token
        const responseText = entry.response.content.text;
        const responseJson = responseText && JSON.parse(responseText);
        if (responseJson.access_token) {
          entry.response.content.text = JSON.stringify(
            {
              ...responseJson,
              access_token: '[REDACTED]',
            },
            null,
            0,
          );
        }
      }
    },
  });
}
