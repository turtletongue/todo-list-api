import { sessionFlusher } from '@dependencies';
import { adminService } from '@features/admins/use-cases';
import { PostAuthenticateController } from './post-authenticate.controller';
import { PostLogoutController } from './post-logout.controller';
import { PostValidateController } from './post-validate.controller';

export const authenticationController = Object.freeze({
  postAuthenticate: new PostAuthenticateController(
    adminService.getAdminByUsername,
    adminService.checkPassword,
  ),
  postValidate: new PostValidateController(),
  postLogout: new PostLogoutController(sessionFlusher),
});
