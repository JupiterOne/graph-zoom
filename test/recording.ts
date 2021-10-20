import {
  Recording,
  setupRecording,
  SetupRecordingInput,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupZoomRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
  });
}
