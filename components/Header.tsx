
import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { SunIcon, MoonIcon, PenSquareIcon } from './Icons';

const Header: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const activeLinkStyle = {
    color: 'rgb(79 70 229)', // indigo-600
    fontWeight: 500
  };

  const darkActiveLinkStyle = {
    color: 'rgb(129 140 248)', // indigo-400
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
              Inkwell
            </Link>
            <nav className="hidden md:flex space-x-6">
              {['Home', 'Posts', 'About', 'Dashboard'].map((item) => (
                <NavLink
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  style={({ isActive }) => isActive ? (themeContext?.isDarkMode ? darkActiveLinkStyle : activeLinkStyle) : {}}
                >
                  {item}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/editor"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              <PenSquareIcon className="h-4 w-4" />
              <span>Write</span>
            </Link>
            <button
              onClick={themeContext?.toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {themeContext?.isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
