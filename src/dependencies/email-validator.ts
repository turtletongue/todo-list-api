import { EmailValidator } from '@declarations';

export const emailValidator: EmailValidator = {
  isValid: (email: string) => /^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(email),
};
