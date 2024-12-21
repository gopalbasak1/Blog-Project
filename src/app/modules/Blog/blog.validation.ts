import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
  }),
});

const updatedBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .optional(),
  }),
});

// const getAllBlogsValidationSchema = z.object({
//   query: z.object({
//     search: z.string().optional(),
//     sortBy: z.string().optional(),
//     sortOrder: z.enum(['asc', 'desc']).optional(),
//     filter: z.string().optional(),
//   }),
// });

export const BlogValidation = {
  createBlogValidationSchema,
  updatedBlogValidationSchema,
  //getAllBlogsValidationSchema,
};
