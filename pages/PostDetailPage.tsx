
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, ContentBlock } from '../types';

const PostDetailPage: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tableOfContents = post.content
    .filter(block => block.type === 'h1' || block.type === 'h2' || block.type === 'h3')
    .map(block => ({
        ...block,
        slug: block.content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    }));
    
  const renderBlock = (block: ContentBlock) => {
    const blockSlug = block.content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    switch (block.type) {
      case 'h1': return <h1 id={blockSlug} className="text-4xl font-bold font-serif mt-12 mb-4">{block.content}</h1>;
      case 'h2': return <h2 id={blockSlug} className="text-3xl font-bold font-serif mt-10 mb-4">{block.content}</h2>;
      case 'h3': return <h3 id={blockSlug} className="text-2xl font-bold font-serif mt-8 mb-4">{block.content}</h3>;
      case 'paragraph': return <p className="my-6 leading-relaxed">{block.content}</p>;
      case 'quote': return <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-8">{block.content}</blockquote>;
      case 'image': return <img src={block.content} alt="" className="my-8 rounded-lg shadow-md mx-auto" />;
      case 'code': return <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-8"><code className={`language-${block.language}`}>{block.content}</code></pre>;
      case 'divider': return <hr className="my-12 border-gray-200 dark:border-gray-700" />;
      case 'ul': return <li className="ml-8 list-disc">{block.content}</li>
      case 'ol': return <li className="ml-8 list-decimal">{block.content}</li>
      case 'video': return <iframe className="my-8 w-full aspect-video rounded-lg shadow-md" src={block.url} title="Embedded video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
      default: return null;
    }
  };

  return (
    <article>
      <header className="mb-12">
        {post.coverImage && (
          <div className="h-64 md:h-96 lg:h-[480px] w-full overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="flex space-x-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 dark:text-white leading-tight">
                    {post.title}
                </h1>
                <p className="mt-6 text-gray-500 dark:text-gray-400">
                    Published on <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                </p>
            </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
        {tableOfContents.length > 2 && (
            <aside className="lg:w-1/4 lg:pr-8 mb-12 lg:mb-0">
                <div className="sticky top-24">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
                    <ul className="space-y-2">
                        {tableOfContents.map(item => (
                            <li key={item.id} className={item.type === 'h3' ? 'ml-4' : ''}>
                                <a href={`#${item.slug}`} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm">
                                    {item.content}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none flex-1">
            {post.content.map(renderBlock)}
        </div>
      </div>
    </article>
  );
};

export default PostDetailPage;
