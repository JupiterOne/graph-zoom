import { accountSteps } from './account';
import { userSteps } from './users';
import { groupSteps } from './groups';
import { roleSteps } from './roles';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
];

export { integrationSteps };
