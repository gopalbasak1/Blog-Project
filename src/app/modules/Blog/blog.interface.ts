//import mongoose from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author?: string;
  isPublished?: boolean;
}
