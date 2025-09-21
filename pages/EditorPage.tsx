import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Post, ContentBlock, PostStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simple content editable component to avoid complex editor libraries for this example.
// Moved outside EditorPage to prevent re-renders on parent state change.
const EditableBlock: React.FC<{ block: ContentBlock, updateBlock: (id: string, content: string) => void }> = ({ block, updateBlock }) => {
    // Corrected event type to React.FocusEvent<HTMLElement> to be compatible with all elements using it.
    const handleInput = (e: React.FocusEvent<HTMLElement>) => {
        updateBlock(block.id, e.currentTarget.innerText);
    };

    const getElement = () => {
        switch (block.type) {
            case 'h1':
                return <h1 className="text-4xl font-bold font-serif" contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</h1>;
            case 'h2':
                return <h2 className="text-3xl font-bold font-serif" contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</h2>;
            case 'h3':
                return <h3 className="text-2xl font-bold font-serif" contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</h3>;
            case 'paragraph':
                return <p className="text-lg leading-relaxed" contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</p>;
            case 'quote':
                 return <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic" contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</blockquote>;
            default:
                return <div contentEditable onBlur={handleInput} suppressContentEditableWarning>{block.content}</div>;
        }
    };
    
    return <div className="py-2">{getElement()}</div>;
};


interface EditorPageProps {
  posts: Post[];
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ posts, setPosts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const existingPost = posts.find(p => p.id === id);
      if (existingPost) {
        setPost(existingPost);
      } else {
        // Post not found, redirect
        navigate('/editor');
      }
    } else {
      // New post
      const newPost: Post = {
        id: uuidv4(),
        title: '',
        slug: '',
        content: [{ id: uuidv4(), type: 'paragraph', content: 'Start writing your story...' }],
        coverImage: '',
        tags: [],
        status: PostStatus.DRAFT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reads: 0,
        engagement: 0,
      };
      setPost(newPost);
    }
  }, [id, posts, navigate]);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const savePost = useCallback((currentPost: Post | null) => {
      if (!currentPost) return;
      setIsSaving(true);
      const updatedPost = { 
          ...currentPost, 
          updatedAt: new Date().toISOString(),
          slug: slugify(currentPost.title || 'untitled')
      };
      setPosts(prevPosts => {
          const exists = prevPosts.some(p => p.id === updatedPost.id);
          if (exists) {
              return prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p);
          }
          return [...prevPosts, updatedPost];
      });
      setTimeout(() => setIsSaving(false), 1000);
  }, [setPosts]);


  useEffect(() => {
      const handler = setTimeout(() => {
          savePost(post);
      }, 2000); // Auto-save every 2 seconds

      return () => {
          clearTimeout(handler);
      };
  }, [post, savePost]);

  const updatePost = (field: keyof Post, value: any) => {
    setPost(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const updateBlock = (blockId: string, content: string) => {
     setPost(prev => {
         if (!prev) return null;
         const newContent = prev.content.map(b => b.id === blockId ? {...b, content} : b);
         return {...prev, content: newContent};
     })
  };

  const addBlock = (type: ContentBlock['type']) => {
    if (!post) return;
    const newBlock: ContentBlock = { id: uuidv4(), type, content: '' };
    if (type === 'divider') newBlock.content = '---';
    setPost({ ...post, content: [...post.content, newBlock] });
  };
  
  const handlePublish = () => {
    if(!post) return;
    if(!post.title) {
        alert("Please add a title before publishing.");
        return;
    }
    const finalPost = { ...post, status: PostStatus.PUBLISHED, updatedAt: new Date().toISOString(), slug: slugify(post.title)};
    setPost(finalPost);
    savePost(finalPost);
    navigate(`/posts/${finalPost.slug}`);
  };


  if (!post) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <Link to="/dashboard" className="text-lg font-bold font-serif text-gray-900 dark:text-white">
              Inkwell Editor
            </Link>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{isSaving ? 'Saving...' : 'Saved'}</span>
                <button onClick={() => savePost(post)} className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50">Save Draft</button>
                <button onClick={handlePublish} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700">{post.status === PostStatus.PUBLISHED ? 'Update Post' : 'Publish'}</button>
            </div>
        </header>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="space-y-6">
            <input
              type="text"
              placeholder="Post Title"
              value={post.title}
              onChange={e => updatePost('title', e.target.value)}
              className="w-full text-5xl font-bold font-serif bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Cover Image URL"
              value={post.coverImage}
              onChange={e => updatePost('coverImage', e.target.value)}
              className="w-full text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:ring-0 focus:border-indigo-500 p-2 text-gray-600 dark:text-gray-400"
            />
            
            {post.content.map(block => <EditableBlock key={block.id} block={block} updateBlock={updateBlock} />)}

            <div className="flex space-x-2">
                <button onClick={() => addBlock('h2')} className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">H2</button>
                <button onClick={() => addBlock('h3')} className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">H3</button>
                <button onClick={() => addBlock('paragraph')} className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">P</button>
                <button onClick={() => addBlock('quote')} className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Quote</button>
                <button onClick={() => addBlock('divider')} className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">---</button>
            </div>
             <input
              type="text"
              placeholder="Tags (comma separated)"
              value={post.tags.join(', ')}
              onChange={e => updatePost('tags', e.target.value.split(',').map(t => t.trim()))}
              className="w-full text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:ring-0 focus:border-indigo-500 p-2 text-gray-600 dark:text-gray-400"
            />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
