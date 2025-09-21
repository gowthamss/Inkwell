
import React from 'react';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { PostStatus } from '../types';

interface HomePageProps {
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  const publishedPosts = posts
    .filter((post) => post.status === PostStatus.PUBLISHED)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const featuredPost = publishedPosts[0];
  const recentPosts = publishedPosts.slice(1, 7);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      {featuredPost && (
        <div className="mb-12 group">
          <Link to={`/posts/${featuredPost.slug}`}>
            <div className="relative rounded-lg overflow-hidden shadow-xl h-64 md:h-96">
              <img src={featuredPost.coverImage} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-white leading-tight">
                  {featuredPost.title}
                </h1>
                <p className="mt-4 text-lg text-gray-200 hidden md:block">
                  {featuredPost.content.find(b => b.type === 'paragraph')?.content.slice(0, 120)}...
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Recent Posts Grid */}
      <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-8 border-b-2 border-indigo-500 pb-2 inline-block">
        Recent Posts
      </h2>
      {recentPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">No recent posts found.</p>
      )}

      <div className="text-center mt-12">
        <Link 
            to="/posts"
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-transform hover:scale-105"
        >
            View All Posts
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
