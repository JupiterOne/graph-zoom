import * as dotenv from 'dotenv';
import * as path from 'path';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_ACCOUNT_ID = 'N0oChUdLTrCZLfk9JXp3Hw';
const DEFAULT_CLIENT_ID = 'dummy-client-id';
const DEFAULT_CLIENT_SECRET = 'highly-fake-secret';
const DEFAULT_SCOPES = 'dummy-zoom-scopes-list';

export const integrationConfig: IntegrationConfig = {
  accountId: process.env.ACCOUNT_ID || DEFAULT_ACCOUNT_ID,
  clientId: process.env.CLIENT_ID || DEFAULT_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET || DEFAULT_CLIENT_SECRET,
  scopes: process.env.SCOPES || DEFAULT_SCOPES,
};
