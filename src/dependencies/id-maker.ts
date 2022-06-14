import { v4 as uuid4, validate as validateUuid } from 'uuid';

import { IdMaker, Id } from '@declarations';

export const idMaker: IdMaker = Object.freeze({
  make: () => uuid4(),
  validate: (id: Id) => validateUuid(String(id)),
});
