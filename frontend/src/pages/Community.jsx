import React, { useState } from 'react';
import PostCard from '../components/PostCard.jsx';

export default function Community() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Alex', text: 'Best pre-workout snack?' },
    { id: 2, user: 'Jamie', text: 'Anyone tried intermittent fasting?' },
  ]);
  const [newPost, setNewPost] = useState('');

  const addPost = (e) => {
    e.preventDefault();
    if (!newPost) return;
    setPosts([{ id: Date.now(), user: 'You', text: newPost }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">Community</h1>
      <form onSubmit={addPost} className="mb-6 flex gap-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Share something or ask an expert..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
          Post
        </button>
      </form>
      <div className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} user={p.user} text={p.text} />
        ))}
      </div>
    </div>
  );
}
