import React from 'react';

export default function PostCard({ user, text }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h4 className="font-semibold text-emerald-700">{user}</h4>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
