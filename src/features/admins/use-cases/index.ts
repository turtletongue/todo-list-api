import { idMaker } from '@dependencies';
import { adminRepository } from '../repository';
import { AddAdminCommand } from './add-admin.command';
import { CheckPasswordCommand } from './check-password.command';
import { EditAdminCommand } from './edit-admin.command';
import { FindAllAdminsCommand } from './find-all-admins.command';
import { GetAdminByIdCommand } from './get-admin-by-id.command';
import { GetAdminByUsernameCommand } from './get-admin-by-username.command';
import { RemoveAdminCommand } from './remove-admin.command';

export const adminService = Object.freeze({
  addAdmin: new AddAdminCommand(adminRepository),
  editAdmin: new EditAdminCommand(adminRepository),
  findAllAdmins: new FindAllAdminsCommand(adminRepository),
  getAdminById: new GetAdminByIdCommand(adminRepository, idMaker),
  getAdminByUsername: new GetAdminByUsernameCommand(adminRepository),
  removeAdmin: new RemoveAdminCommand(adminRepository),
  checkPassword: new CheckPasswordCommand(adminRepository),
});
