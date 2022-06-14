import { Id } from '../id.type';

export interface IdMaker {
  make(): Id;
  validate(id: Id): boolean;
}
