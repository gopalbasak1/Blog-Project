import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Users/user.constant';
import { AdminControllers } from './admins.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockUser,
);

export const AdminRoutes = router;
