
import React, { useState, useEffect, useMemo, createContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import AboutPage from './pages/AboutPage';
import PostDetailPage from './pages/PostDetailPage';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';
import { Post } from './types';
import { INITIAL_POSTS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const App: React.FC = () => {
  const [posts, setPosts] = useLocalStorage<Post[]>('blog-posts', INITIAL_POSTS);

  return (
    <ThemeProvider>
      <AppRouter posts={posts} setPosts={setPosts} />
    </ThemeProvider>
  );
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('dark-mode', false);

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;
    isDarkMode ? bodyClass.add(className) : bodyClass.remove(className);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleDarkMode
  }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

interface AppRouterProps {
  posts: Post[];
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
}

const AppRouter: React.FC<AppRouterProps> = ({ posts, setPosts }) => {
  const location = useLocation();
  const isEditorPage = location.pathname.startsWith('/editor');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {!isEditorPage && <Header />}
      <main className={`${!isEditorPage ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/posts" element={<PostsPage posts={posts} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts/:slug" element={<PostDetailPage posts={posts} />} />
          <Route path="/editor" element={<EditorPage posts={posts} setPosts={setPosts} />} />
          <Route path="/editor/:id" element={<EditorPage posts={posts} setPosts={setPosts} />} />
          <Route path="/dashboard" element={<DashboardPage posts={posts} setPosts={setPosts} />} />
        </Routes>
      </main>
    </div>
  );
};

// As AppRouter uses useLocation, it must be inside a Router.
// We wrap the whole App in a HashRouter for simplicity.
const Root: React.FC = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default Root;
