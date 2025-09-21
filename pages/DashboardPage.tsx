
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Post, PostStatus } from '../types';
import { Trash2Icon, EditIcon, EyeIcon, MessageCircleIcon } from '../components/Icons';

interface DashboardPageProps {
  posts: Post[];
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ posts, setPosts }) => {
  const [activeTab, setActiveTab] = useState<PostStatus | 'all'>('all');
  const navigate = useNavigate();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          status: post.status === PostStatus.PUBLISHED ? PostStatus.DRAFT : PostStatus.PUBLISHED,
          updatedAt: new Date().toISOString()
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts
    .filter(post => activeTab === 'all' || post.status === activeTab)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white">Dashboard</h1>
        <Link
          to="/editor"
          className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 font-medium"
        >
          New Post
        </Link>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('all')} className={`${activeTab === 'all' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>All Posts</button>
          <button onClick={() => setActiveTab(PostStatus.PUBLISHED)} className={`${activeTab === PostStatus.PUBLISHED ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Published</button>
          <button onClick={() => setActiveTab(PostStatus.DRAFT)} className={`${activeTab === PostStatus.DRAFT ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Drafts</button>
        </nav>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredPosts.map(post => (
            <li key={post.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                    <Link to={`/editor/${post.id}`}>{post.title || 'Untitled Post'}</Link>
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === PostStatus.PUBLISHED ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                      {post.status}
                    </span>
                    <span>Last updated: {formatDate(post.updatedAt)}</span>
                    <div className="flex items-center"><EyeIcon className="w-4 h-4 mr-1"/> {post.reads}</div>
                    <div className="flex items-center"><MessageCircleIcon className="w-4 h-4 mr-1"/> {post.engagement}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                   <button onClick={() => handleToggleStatus(post.id)} className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">{post.status === PostStatus.PUBLISHED ? 'Unpublish' : 'Publish'}</button>
                   <button onClick={() => navigate(`/editor/${post.id}`)} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><EditIcon className="w-5 h-5"/></button>
                   <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><Trash2Icon className="w-5 h-5"/></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredPosts.length === 0 && <p className="text-center py-12 text-gray-500">No posts in this category.</p>}
      </div>
    </div>
  );
};

export default DashboardPage;
