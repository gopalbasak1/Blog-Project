import { User } from '../../Users/Users.model';
import { Blog } from '../Blog/blog.model';

const blockUser = async (userId: string) => {
  // Find the user by ID
  const user = await User.findById(userId);
  console.log(user);

  if (!user) {
    return null; // User not found
  }

  // Update the user's `isBlocked` property
  user.isBlocked = true;
  await user.save();

  return user;
};

const deleteBlog = async (id: string) => {
  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    return null; // Blog not found
  }

  // Delete the blog
  await Blog.findByIdAndDelete(id);

  return blog; // Return the blog that was deleted
};

export const AdminServices = { blockUser, deleteBlog };
