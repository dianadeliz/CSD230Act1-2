// src/PostList.js
import React from 'react';
import './PostList.css';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((p) => (
        <div key={p.id} className="post-item">
          <p>{p.content}</p>
          <small>— {p.author}</small>
        </div>
      ))}
    </div>
  );
}

export default PostList;
