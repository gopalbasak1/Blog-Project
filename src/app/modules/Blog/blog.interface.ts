//import mongoose from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author?: string;
  isPublished?: boolean;
}

export interface GetBlogsParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}
