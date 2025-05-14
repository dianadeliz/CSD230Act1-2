// src/PostForm.js
import React, { useState } from 'react';
import './PostForm.css';


function PostForm({ discussionId, onAddPost }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Post content is required');
      return;
    }

    try {
      await onAddPost(discussionId, content);
      setContent('');
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;