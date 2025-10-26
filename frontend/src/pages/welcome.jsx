import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Welcome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const actions = [
    { label: "Go to Dashboard", color: "emerald", onClick: () => navigate('/dashboard') },
    { label: "Edit Profile", color: "indigo", onClick: () => navigate('/profile') },
    { label: "Add Biometric Data", color: "teal", onClick: () => navigate('/data-input') },
    { label: "Log Out", color: "rose", onClick: logout },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center px-4">
      <div className="relative max-w-3xl w-full text-center">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <img
            src="/img-2.png"
            alt="Wellness"
            className="w-full h-full object-cover filter brightness-50 rounded-3xl"
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
            Welcome {user?.name || user?.email || 'Guest'}
          </h1>
          <p className="text-gray-700">Choose an action below to continue</p>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={`bg-${action.color}-600 hover:bg-${action.color}-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition transform hover:-translate-y-1`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}