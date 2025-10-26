import React from "react";
import { Link } from "react-router-dom";

export default function HealthGoals() {
  const goals = [
    { title: "Weight Loss", desc: "Personalized calorie & activity plans", icon: "⚖️" },
    { title: "Muscle Gain", desc: "Strength training & protein tracking", icon: "💪" },
    { title: "Balanced Meal Plan", desc: "Daily meals designed by nutritionists", icon: "🥗" },
    { title: "General Wellness", desc: "Maintain and track a healthy lifestyle", icon: "🌿" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-20 px-6">
      <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-16">
        Choose Your Health Goal
      </h1>

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {goals.map((g) => (
          <Link
            key={g.title}
            to={`/signup?goal=${encodeURIComponent(g.title)}`}
            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all text-center flex flex-col items-center justify-center"
          >
            <div className="text-6xl mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
              {g.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
              {g.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{g.desc}</p>
            <span className="mt-4 inline-block text-emerald-600 font-semibold group-hover:underline">
              → Select
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}