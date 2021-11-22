import { Router } from 'express';
import { userController } from './controllers';
import { providerController } from './controllers';
import { vaultController } from './controllers';

const router = Router();

// Auth
router.post('/verify', userController.verify);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/user', userController.user);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.get('/google-drive/get-token', providerController.googleGetAuthCode);

// Vault
router.post('/vault/create-notebook', vaultController.createNotebook);

router.post('/vault/add-file', vaultController.addFile);
router.post('/vault/update-file', vaultController.updateFile);
router.post('/vault/delete-file', vaultController.deleteFile);

router.post('/vault/add-folder', vaultController.addFolder);
router.post('/vault/update-folder', vaultController.updateFolder);
router.post('/vault/delete-folder', vaultController.deleteFolder);

router.post('/vault/add-attachment', vaultController.addAttachment);
router.post('/vault/delete-attachment', vaultController.deleteAttachment);

export { router };
