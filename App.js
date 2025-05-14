// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DiscussionForm from './DiscussionForm';
import DiscussionList from './DiscussionList';
import PostForm from './PostForm';
import PostList from './PostList';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import { login, createDiscussion, getDiscussions, createPost, getPosts } from './services/api';

function App() {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
      fetchDiscussions();
    }
  }, []);

  useEffect(() => {
    if (selectedDiscussionId) {
      fetchPosts(selectedDiscussionId);
    }
  }, [selectedDiscussionId]);

  const fetchDiscussions = async () => {
    try {
      const data = await getDiscussions();
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchPosts = async (discussionId) => {
    try {
      const data = await getPosts(discussionId);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        setUsername(username);
        setIsLoggedIn(true);
        await fetchDiscussions();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
    setDiscussions([]);
    setPosts([]);
  };

  const addDiscussion = async (title, description) => {
    try {
      const newDiscussion = await createDiscussion({ title, description });
      setDiscussions([...discussions, newDiscussion]);
    } catch (error) {
      console.error('Error creating discussion:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const addPost = async (discussionId, content) => {
    try {
      const newPost = await createPost({ discussion: discussionId, content });
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const selectedDiscussion = discussions.find((d) => d._id === selectedDiscussionId);

  return (
    <Router>
      <div className="PageWrapper">
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                isLoggedIn ? (
                  <>
                    <div className="header">
                      <img src="/Discussion-board1.png" alt="Discussion Board" />
                      <h1>Welcome, {username}</h1>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                    <DiscussionForm onAddDiscussion={addDiscussion} />
                    <DiscussionList 
                      discussions={discussions} 
                      onSelect={setSelectedDiscussionId} 
                    />
                    {selectedDiscussion && (
                      <>
                        <h2>{selectedDiscussion.title}</h2>
                        <PostForm
                          discussionId={selectedDiscussionId}
                          onAddPost={addPost}
                        />
                        <PostList posts={posts} />
                      </>
                    )}
                    <Chatbot />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </div>
        <div className="footer">
          © 2025 Discussion Board App. All rights reserved.
        </div>
      </div>
    </Router>
  );
}

export default App;