import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Users/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

// router.post(
//   '/',
//   authenticateUser,
//   authorizeRoles('user'),
//   BlogController.createBlog,
// );

export const BlogRoutes = router;
