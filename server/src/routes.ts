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
router.post('/vault/add', vaultController.addItem);
router.post('/vault/update', vaultController.updateItem);
router.post('/vault/delete', vaultController.deleteItem);
router.get('/vault/download', vaultController.downloadItem)

export { router };
