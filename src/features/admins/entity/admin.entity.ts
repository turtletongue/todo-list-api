import { Entity, Id } from '@declarations';
import { PlainAdmin } from './interfaces/plain-admin.interface';

export class Admin implements Entity<PlainAdmin> {
  constructor(
    private id: Id,
    private username: string,
    private hashedPassword: string | undefined,
    private createdAt: Date,
    private updatedAt: Date,
    public readonly isPasswordMatch: (password: string) => Promise<boolean>,
  ) {}

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getHashedPassword() {
    return this.hashedPassword;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  toPlain() {
    return {
      id: this.getId(),
      username: this.getUsername(),
      hashedPassword: this.getHashedPassword(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
