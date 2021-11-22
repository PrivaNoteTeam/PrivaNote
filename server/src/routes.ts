import { Router } from 'express';
import { userController } from './controllers';
import { providerController } from './controllers';
import { vaultController } from './controllers';

const router = Router();

router.post('/verify', userController.verify);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/user', userController.user);

router.post('/forgot-password', userController.forgotPassword);

router.post('/reset-password', userController.resetPassword);

router.get('/google-drive/get-token', providerController.googleGetAuthCode);

router.post('/vault/notebook', vaultController.createNotebook);

export { router };
