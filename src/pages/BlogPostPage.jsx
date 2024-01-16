import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setEditedTitle(data.title); // Set initial values for the edited fields
        setEditedContent(data.content);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });

      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          title: editedTitle,
          content: editedContent,
        }));
        setEditMode(false);
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='post-detail-container'>
      <div className="back-container">
        <Link className="back-button" to={`/`}>
          Back
        </Link>
      </div>
      <div className='post-detail'>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
