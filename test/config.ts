import * as dotenv from 'dotenv';
import * as path from 'path';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_ZOOM_ACCESS_TOKEN = 'dummy-zoom-access-token';
const DEFAULT_SCOPES = 'dummy-zoom-scopes-list';

export const integrationConfig: IntegrationConfig = {
  zoomAccessToken: process.env.ZOOM_ACCESS_TOKEN || DEFAULT_ZOOM_ACCESS_TOKEN,
  scopes: process.env.SCOPES || DEFAULT_SCOPES,
};
