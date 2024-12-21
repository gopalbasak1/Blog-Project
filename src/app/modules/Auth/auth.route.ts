import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthController.createUser,
);

router.post('/login', AuthController.login);

// router.post('/login', UserController.loginUser);

export const AuthRoutes = router;
