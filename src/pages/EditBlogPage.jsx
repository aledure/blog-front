import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlogPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        navigate.push(`/posts/${id}`); // Redirect to the updated blog post page
      } else {
        console.error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="button" onClick={handleUpdatePost}>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
