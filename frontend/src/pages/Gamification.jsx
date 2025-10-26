import React from "react";
import { useNavigate } from "react-router-dom";
import BadgeCard from "../components/BadgeCard.jsx";

export default function Gamification() {
  const navigate = useNavigate();

  const badges = [
    {
      title: "Starter",
      desc: "Logged your first health metric.",
      icon: "🌱",
    },
    {
      title: "Consistency",
      desc: "Tracked activity for 7 days straight.",
      icon: "🔥",
    },
    {
      title: "Goal Crusher",
      desc: "Reached a major health milestone.",
      icon: "🏆",
    },
    {
      title: "Community Hero",
      desc: "Helped others in the community.",
      icon: "🤝",
    },
  ];

  const handleBadgeClick = (badgeTitle) => {
    // Send user to the Premium page; you can pass badge info if needed
    navigate(`/premium?badge=${encodeURIComponent(badgeTitle)}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">
        Your Achievements
      </h1>
      <p className="text-gray-700 mb-10">
        Earn badges by tracking your progress and engaging with the Bio-Companion
        community. Click a badge to learn more or upgrade to Premium!
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((b) => (
          <div key={b.title} onClick={() => handleBadgeClick(b.title)}>
            <BadgeCard
              title={b.title}
              desc={b.desc}
              icon={b.icon}
              className="cursor-pointer hover:scale-105 transition transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
