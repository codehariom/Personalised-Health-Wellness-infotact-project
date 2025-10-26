import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealPlans } from '../services/api';

export default function MealPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealPlan();
  }, );

  const fetchMealPlan = async () => {
    try {
      const response = await mealPlans.getById(id);
      setMealPlan(response.data.mealPlan);
    } catch (error) {
      console.error('Fetch meal plan error:', error);
      navigate('/meal-plans');
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async () => {
    const rating = prompt('Rate this meal plan (1-5):');
    if (rating && rating >= 1 && rating <= 5) {
      try {
        await mealPlans.rate(id, { rating: Number(rating) });
        fetchMealPlan();
      } catch (error) {
        console.error('Rate meal plan error:', error);
        alert('Failed to rate meal plan');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (!mealPlan) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white pt-24 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">{mealPlan.name}</h1>
            <p className="text-gray-600 mt-1">
              {new Date(mealPlan.date).toLocaleDateString()} • {mealPlan.dietType || 'Standard'} Diet
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/meal-plans')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ← Back
            </button>
            {!mealPlan.rating && (
              <button
                onClick={handleRate}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Rate Plan
              </button>
            )}
          </div>
        </div>

        {/* Rating */}
        {mealPlan.rating && (
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 font-semibold text-center shadow-sm">
            ⭐ Rated {mealPlan.rating}/5
          </div>
        )}

        {/* Nutrition Summary */}
        {mealPlan.totalNutrition && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['calories', 'protein', 'carbs', 'fat'].map((key) => (
              <div key={key} className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {Math.round(mealPlan.totalNutrition[key] || 0)}{key === 'protein' || key === 'carbs' || key === 'fat' ? 'g' : ''}
                </p>
                <p className="text-gray-600 capitalize">{key}</p>
              </div>
            ))}
          </div>
        )}

        {/* Meals */}
        <div className="space-y-6">
          {mealPlan.meals?.map((meal, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-xl capitalize">{meal.type}: {meal.name}</h3>
                <span className="text-sm text-gray-500">
                  {meal.prepTime && `Prep: ${meal.prepTime}min`}
                  {meal.cookTime && ` • Cook: ${meal.cookTime}min`}
                </span>
              </div>

              {meal.totalNutrition && (
                <div className="grid grid-cols-4 gap-2 text-center text-sm mb-3">
                  <div><strong>{Math.round(meal.totalNutrition.calories)}</strong><br/>Cal</div>
                  <div><strong>{Math.round(meal.totalNutrition.protein || 0)}g</strong><br/>Protein</div>
                  <div><strong>{Math.round(meal.totalNutrition.carbs || 0)}g</strong><br/>Carbs</div>
                  <div><strong>{Math.round(meal.totalNutrition.fat || 0)}g</strong><br/>Fat</div>
                </div>
              )}

              <h4 className="font-medium mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {meal.items?.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.name} ({item.quantity} {item.unit})</span>
                    <span className="text-gray-500">{Math.round(item.nutrition?.calories || 0)} cal</span>
                  </li>
                ))}
              </ul>

              {meal.recipe && (
                <div className="mt-3">
                  <h5 className="font-medium">Instructions:</h5>
                  <p className="text-gray-600 text-sm mt-1">{meal.recipe}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}