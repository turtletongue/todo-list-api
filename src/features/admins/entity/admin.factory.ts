import { UnprocessableEntityError } from '@errors';
import {
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_USERNAME_LENGTH,
} from './admin.constants';
import { Admin } from './admin.entity';

import { IdMaker, Sanitize, Hasher } from '@declarations';
import { BuildAdminOptions } from './interfaces/build-admin-options.interface';

export class AdminFactory {
  constructor(
    private readonly idMaker: IdMaker,
    private readonly sanitize: Sanitize,
    private readonly hasher: Hasher,
  ) {}

  async build({
    id = this.idMaker.make(),
    username,
    password,
    hashedPassword,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: BuildAdminOptions): Promise<Readonly<Admin>> {
    if (!this.idMaker.validate(id)) {
      throw new UnprocessableEntityError('Admin must have a valid id');
    }

    const sanitizedUsername = this.sanitize(username);

    if (sanitizedUsername.length < MINIMUM_USERNAME_LENGTH) {
      throw new UnprocessableEntityError(
        `Username must be longer than ${MINIMUM_USERNAME_LENGTH} characters`,
      );
    }

    if (password && password.length < MINIMUM_PASSWORD_LENGTH) {
      throw new UnprocessableEntityError(
        `Password must be longer than ${MINIMUM_PASSWORD_LENGTH} characters`,
      );
    }

    let passwordHash = hashedPassword;

    if (password) {
      passwordHash = await this.hasher.hash(password);
    }

    const compareHashes = this.hasher.compare;
    const isPasswordMatch = async function (this: Admin, password: string) {
      const hashedPassword = this.getHashedPassword();

      if (!hashedPassword) {
        return false;
      }

      return compareHashes(password, hashedPassword);
    };

    return Object.freeze(
      new Admin(
        id,
        sanitizedUsername,
        passwordHash,
        createdAt,
        updatedAt,
        isPasswordMatch,
      ),
    );
  }
}
