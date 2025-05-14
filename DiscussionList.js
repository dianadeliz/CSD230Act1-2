// src/DiscussionList.js
import React from 'react';
import './DiscussionList.css';

function DiscussionList({ discussions, onSelect }) {
  return (
    <div className="discussion-list-wrapper">
      <h2 className="discussion-list-title">Discussions</h2>
      <div className="discussion-list">
        {discussions.length === 0 ? (
          <div className="discussion-list-empty">No discussions yet. Start one!</div>
        ) : (
          discussions.map((discussion) => (
            <div 
              key={discussion._id} 
              onClick={() => onSelect(discussion._id)} 
              className="discussion-list-item"
            >
              <div className="discussion-list-item-title">{discussion.title}</div>
              <div className="discussion-list-item-meta">
                <span className="discussion-list-item-author">Started by: <em>{discussion.author?.username || 'Unknown'}</em></span>
              </div>
              <div className="discussion-list-item-desc">{discussion.description}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DiscussionList;
