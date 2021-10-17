import { Router } from 'express';
import { userController } from './controllers';

const router = Router();

router.post('/verify', userController.verify);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

export { router };
