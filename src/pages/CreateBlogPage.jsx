import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate.push(`/posts/${data.id}`); // Redirect to the new blog post page
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreatePost}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
