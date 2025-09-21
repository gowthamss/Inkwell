
import { Post, PostStatus } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'b7b2a6d7-1baf-4bd9-9f79-6d803a3d2159',
    title: 'Exploring the Serene Landscapes of the North',
    slug: 'exploring-the-serene-landscapes-of-the-north',
    coverImage: 'https://picsum.photos/seed/north/1200/800',
    content: [
      { id: '1', type: 'h1', content: 'A Journey Begins' },
      { id: '2', type: 'paragraph', content: 'The crisp morning air filled my lungs as I stepped out of the cabin. The world was painted in hues of deep green and misty grey, a signature of the northern wilderness. This was the beginning of a journey not just across lands, but into the very heart of nature.' },
      { id: '3', type: 'image', content: 'https://picsum.photos/seed/forest/800/600', url: '' },
      { id: '4', type: 'paragraph', content: 'They say the journey of a thousand miles begins with a single step. My first step was onto a path carpeted with pine needles, leading towards an unseen horizon.' },
      { id: '5', type: 'h2', content: 'The Whispering Woods' },
      { id: '6', type: 'paragraph', content: 'The forest here is ancient, with trees that have stood for centuries. Their branches form a dense canopy, filtering the sunlight into ethereal rays that dance on the forest floor. It feels like walking through a cathedral built by time itself.' },
      { id: '7', type: 'quote', content: 'In every walk with nature, one receives far more than he seeks.' },
    ],
    tags: ['travel', 'nature', 'adventure', 'photography'],
    status: PostStatus.PUBLISHED,
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
    updatedAt: new Date('2023-10-26T12:30:00Z').toISOString(),
    reads: 1256,
    engagement: 87,
  },
  {
    id: 'f3a9e1d8-8b7c-4f6a-9e1d-3b4c5d6e7f8a',
    title: 'The Art of Minimalist Design',
    slug: 'the-art-of-minimalist-design',
    coverImage: 'https://picsum.photos/seed/minimal/1200/800',
    content: [
       { id: '1', type: 'h1', content: 'Less is More' },
       { id: '2', type: 'paragraph', content: 'Minimalism is not the lack of something. It\'s simply the perfect amount of something. In design, this philosophy translates to creating clean, uncluttered, and functional interfaces that prioritize content and user experience.' },
       { id: '3', type: 'h2', content: 'Core Principles' },
       { id: '4', type: 'ul', content: 'Use of negative space' },
       { id: '5', type: 'ul', content: 'Limited color palettes' },
       { id: '6', type: 'ul', content: 'Strong typography' },
    ],
    tags: ['design', 'uiux', 'minimalism', 'webdev'],
    status: PostStatus.PUBLISHED,
    createdAt: new Date('2023-11-05T14:00:00Z').toISOString(),
    updatedAt: new Date('2023-11-05T16:00:00Z').toISOString(),
    reads: 2345,
    engagement: 213,
  },
  {
    id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    title: 'A New Post in the Works',
    slug: 'a-new-post-in-the-works',
    content: [
        { id: '1', type: 'paragraph', content: 'This is the beginning of a new masterpiece...' }
    ],
    tags: [],
    status: PostStatus.DRAFT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reads: 0,
    engagement: 0,
  }
];
