import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPosts((prevPosts) => [data, ...prevPosts]);
        setNewTitle("");
        setNewContent("");
        window.location.reload();
      } else {
        console.error("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };
  
  
  


  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div>
      <h1 className="all-posts underline new-post">New Post</h1>

      <div className="new-post-container">
        <input
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="title-input"
          placeholder="Title"
        />
        <textarea
          label="Content"
          rows={10}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="content-input"
          placeholder="New post..."
        />
        <button className="create-button" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>

      <h1 className="all-posts underline">All Posts</h1>
      <ul>
  {posts.map((post, index) => (
    <li key={post.id || index}>
      <div>
        <h2 className="post-title">{post.title}</h2>
        <p>{post.content}</p>
        <div className="button-container">
          <Link className="button" to={`/posts/${post.id}`}>
            View
          </Link>
          <button type="button" onClick={() => handleDeletePost(post.id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>


    </div>
  );
};

export default HomePage;
