import React from 'react';
import { Link } from 'react-router-dom';

const MealPlanCard = ({ mealPlan, onRate, onDelete }) => {
  const getDietColor = (dietType) => {
    const colors = {
      vegetarian: 'bg-green-100 text-green-700',
      vegan: 'bg-emerald-100 text-emerald-700',
      keto: 'bg-purple-100 text-purple-700',
      paleo: 'bg-orange-100 text-orange-700',
      mediterranean: 'bg-blue-100 text-blue-700',
      none: 'bg-gray-100 text-gray-700'
    };
    return colors[dietType] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{mealPlan.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(mealPlan.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}{" "}
            • <span className="text-gray-600">{mealPlan.meals?.length || 0} meals</span>
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${getDietColor(
            mealPlan.dietType
          )}`}
        >
          {mealPlan.dietType === 'none' ? 'Standard' : mealPlan.dietType}
        </span>
      </div>

      {/* Nutrition Summary */}
      {mealPlan.totalNutrition && (
        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
          <div className="bg-emerald-50 rounded-lg py-2">
            <div className="text-lg font-bold text-emerald-700">
              {Math.round(mealPlan.totalNutrition.calories)}
            </div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="bg-emerald-50 rounded-lg py-2">
            <div className="text-lg font-bold text-emerald-700">
              {Math.round(mealPlan.totalNutrition.protein || 0)}g
            </div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div className="bg-emerald-50 rounded-lg py-2">
            <div className="text-lg font-bold text-emerald-700">
              {Math.round(mealPlan.totalNutrition.carbs || 0)}g
            </div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Link
          to={`/meal-plans/${mealPlan._id}`}
          className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-full shadow hover:opacity-90 transition-all"
        >
          View Details
        </Link>

        <div className="flex space-x-2">
          {!mealPlan.rating && (
            <button
              onClick={() => onRate(mealPlan._id)}
              className="px-4 py-1.5 text-sm font-medium bg-yellow-400 text-white rounded-full hover:bg-yellow-500 shadow-sm transition-all"
            >
              Rate
            </button>
          )}
          <button
            onClick={() => onDelete(mealPlan._id)}
            className="px-4 py-1.5 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Rating Section */}
      {mealPlan.rating && (
        <div className="mt-4 flex items-center justify-center bg-yellow-50 border border-yellow-100 rounded-xl py-2">
          <p className="text-sm text-yellow-700 font-medium">
            ⭐ Rated {mealPlan.rating}/5
          </p>
        </div>
      )}
    </div>
  );
};

export default MealPlanCard;