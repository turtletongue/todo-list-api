import { adminService } from '../use-cases';
import { DeleteAdminController } from './delete-admin.controller';
import { FindAdminsController } from './find-admins.controller';
import { GetAdminController } from './get-admin.controller';
import { PatchAdminController } from './patch-admin.controller';
import { PostAdminController } from './post-admin.controller';

export const adminController = Object.freeze({
  postAdmin: new PostAdminController(adminService.addAdmin),
  patchAdmin: new PatchAdminController(adminService.editAdmin),
  deleteAdmin: new DeleteAdminController(adminService.removeAdmin),
  getAdmin: new GetAdminController(adminService.getAdminById),
  findAdmins: new FindAdminsController(adminService.findAllAdmins),
});
