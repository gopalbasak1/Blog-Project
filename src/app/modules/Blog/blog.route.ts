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

router.patch(
  '/:id',
  auth(USER_ROLE.user), // Only logged-in users
  validateRequest(BlogValidation.updatedBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user), // Only logged-in users
  BlogController.deleteBlog,
);

router.get('/', auth(USER_ROLE.user), BlogController.getAllBlogs);

export const BlogRoutes = router;
