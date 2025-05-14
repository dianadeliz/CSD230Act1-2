// src/DiscussionForm.js
import React, { useState } from 'react';
import './DiscussionForm.css';

function DiscussionForm({ onAddDiscussion }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required!');
      return;
    }
    setError('');
    onAddDiscussion(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="discussion-form-wrapper">
      <form onSubmit={handleSubmit} className="discussion-form">
        <h2 className="discussion-form-title">Create a New Discussion</h2>
        <div className="discussion-form-group">
          <label htmlFor="discussion-title" className="discussion-form-label">Title</label>
          <input
            id="discussion-title"
            type="text"
            className="discussion-form-input"
            placeholder="Enter discussion title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="discussion-form-group">
          <label htmlFor="discussion-description" className="discussion-form-label">Description</label>
          <textarea
            id="discussion-description"
            className="discussion-form-textarea"
            placeholder="Enter discussion description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <div className="discussion-form-error">{error}</div>}
        <button type="submit" className="discussion-form-btn">Create Discussion</button>
      </form>
    </div>
  );
}

export default DiscussionForm;