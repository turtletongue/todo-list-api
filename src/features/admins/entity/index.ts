import { idMaker, makeHasher, sanitize } from '@dependencies';
import { AdminFactory } from './admin.factory';
import { PASSWORD_SALT_ROUNDS } from './admin.constants';

export const adminFactory = Object.freeze(
  new AdminFactory(idMaker, sanitize, makeHasher(PASSWORD_SALT_ROUNDS)),
);
