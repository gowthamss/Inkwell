
import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { SearchIcon } from '../components/Icons';
import { PostStatus } from '../types';

interface PostsPageProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const publishedPosts = posts
    .filter((post) => post.status === PostStatus.PUBLISHED)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return publishedPosts;
    
    const lowercasedTerm = searchTerm.toLowerCase();
    
    return publishedPosts.filter(post => 
      post.title.toLowerCase().includes(lowercasedTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)) ||
      post.content.some(block => block.content.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm, publishedPosts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white">All Posts</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore the collection of articles and thoughts.
        </p>
      </div>

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">
          No posts found for your search term. Try another search.
        </p>
      )}
    </div>
  );
};

export default PostsPage;
