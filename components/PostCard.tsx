
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const excerpt = post.content.find(block => block.type === 'paragraph')?.content.substring(0, 150) + '...';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <Link to={`/posts/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="h-48 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={post.coverImage} alt={post.title} />
          </div>
        )}
      </Link>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex space-x-2 mb-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/posts/${post.slug}`} className="block mt-2">
            <p className="text-xl font-semibold font-serif text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{post.title}</p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{excerpt}</p>
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
