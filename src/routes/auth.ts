import { Router } from 'express';
import { registrationValidator, loginValidator } from '../validations/auth';
import { isAuth } from '../middlewares/auth';
import authController from '../controllers/auth';

const router = Router();

router.post('/register', registrationValidator, authController.register);

router.post('/login', loginValidator, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
