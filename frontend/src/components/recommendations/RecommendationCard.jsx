import React, { useState } from "react";
import { recommendations } from "../../services/api";

const RecommendationCard = ({ recommendation, onUpdate, compact = false }) => {
  const [loading, setLoading] = useState(false);

  const getTypeIcon = (type) => {
    const icons = {
      workout: "💪",
      meal: "🍽️",
      wellness: "🧘",
      goal: "🎯",
    };
    return icons[type] || "💡";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-gradient-to-r from-red-100 to-red-200 text-red-700",
      medium: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700",
      low: "bg-gradient-to-r from-green-100 to-green-200 text-green-700",
    };
    return colors[priority] || "bg-gray-100 text-gray-700";
  };

  const handleStatusUpdate = async (status) => {
    setLoading(true);
    try {
      await recommendations.updateStatus(recommendation._id, { status });
      onUpdate && onUpdate();
    } catch (error) {
      console.error("Update recommendation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`transition-all duration-300 hover:shadow-lg border border-emerald-100 rounded-2xl bg-white/90 backdrop-blur-md ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div className="flex items-start space-x-3">
          <span className="text-3xl">{getTypeIcon(recommendation.type)}</span>
          <div>
            <h3
              className={`font-semibold text-gray-900 ${
                compact ? "text-sm" : "text-lg"
              }`}
            >
              {recommendation.title}
            </h3>
            <p
              className={`text-gray-600 ${
                compact ? "text-xs" : "text-sm"
              } mt-1 leading-snug`}
            >
              {recommendation.description}
            </p>
            {recommendation.reasoning && !compact && (
              <p className="text-xs text-gray-500 mt-2 italic">
                💭 <span className="text-gray-600">{recommendation.reasoning}</span>
              </p>
            )}
          </div>
        </div>

        {/* Priority Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getPriorityColor(
            recommendation.priority
          )}`}
        >
          {recommendation.priority.charAt(0).toUpperCase() +
            recommendation.priority.slice(1)}
        </span>
      </div>

      {/* Buttons / Status */}
      {recommendation.status === "pending" ? (
        <div
          className={`flex space-x-2 ${
            compact ? "mt-3" : "mt-5"
          } justify-end`}
        >
          <button
            onClick={() => handleStatusUpdate("accepted")}
            disabled={loading}
            className="px-4 py-1.5 text-xs rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow hover:shadow-md transition disabled:opacity-70"
          >
            {loading ? "..." : "Accept"}
          </button>
          <button
            onClick={() => handleStatusUpdate("dismissed")}
            disabled={loading}
            className="px-4 py-1.5 text-xs rounded-lg bg-gray-500 text-white font-medium shadow hover:bg-gray-600 transition disabled:opacity-70"
          >
            Dismiss
          </button>
        </div>
      ) : (
        <div className={`${compact ? "mt-3" : "mt-5"} text-right`}>
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-medium shadow-sm ${
              recommendation.status === "accepted"
                ? "bg-emerald-100 text-emerald-700"
                : recommendation.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {recommendation.status.charAt(0).toUpperCase() +
              recommendation.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;