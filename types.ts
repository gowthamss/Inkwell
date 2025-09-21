
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export type ContentBlockType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'paragraph'
  | 'quote'
  | 'code'
  | 'image'
  | 'video'
  | 'divider'
  | 'ul'
  | 'ol';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  language?: string; // for code blocks
  url?: string; // for links within paragraphs or for video embeds
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: ContentBlock[];
  coverImage?: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  reads: number;
  engagement: number;
}
