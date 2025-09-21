
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center">
        <img 
          className="w-32 h-32 rounded-full mx-auto shadow-lg" 
          src="https://picsum.photos/seed/author/200" 
          alt="Author's portrait" 
        />
        <h1 className="mt-6 text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white">
          About the Author
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          A storyteller, developer, and lifelong learner.
        </p>
      </div>
      
      <div className="mt-12 prose prose-lg dark:prose-invert max-w-none text-justify">
        <p>
          Welcome to Inkwell, my personal corner of the internet. I'm a passionate writer and software engineer with a love for creating beautiful, functional things—both in code and in words. This blog is a space where I explore my thoughts on technology, design, personal growth, and the occasional travel adventure.
        </p>
        <p>
          My journey into the world of tech began with a fascination for how things work, which quickly evolved into a career building software that solves real-world problems. I believe that good design is not just about aesthetics, but about creating intuitive and meaningful experiences. This principle guides my work, whether I'm crafting a user interface or writing an article.
        </p>
        <blockquote>
          "The best way to predict the future is to invent it." - Alan Kay
        </blockquote>
        <p>
          When I'm not coding or writing, you can find me hiking in the mountains, exploring new coffee shops, or lost in a good book. I started Inkwell to document my learnings, share my passions, and connect with like-minded individuals. Thank you for joining me on this journey. I hope you find something here that inspires, educates, or simply makes you think.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
