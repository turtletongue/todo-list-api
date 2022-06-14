import bcrypt from 'bcrypt';

import { Hasher } from '@declarations';

export const makeHasher = (saltRounds: number): Hasher =>
  Object.freeze({
    hash: (input: string) => bcrypt.hash(input, saltRounds),
    compare: (plain: string, hash: string) => bcrypt.compare(plain, hash),
  });
