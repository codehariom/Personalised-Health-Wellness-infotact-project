import React, { useState, useEffect } from 'react';
import { mealPlans } from '../services/api';
import MealPlanCard from '../components/mealplans/MealPlanCard';

export default function MealPlans() {
  const [mealPlanList, setMealPlanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchMealPlans();
  }, [filters]);

  const fetchMealPlans = async () => {
    setLoading(true);
    try {
      const response = await mealPlans.getAll(filters);
      setMealPlanList(response.data.mealPlans || []);
    } catch (error) {
      console.error('Fetch meal plans error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateMealPlan = async (mealPlanId) => {
    const rating = prompt('Rate this meal plan (1-5):');
    if (rating && rating >= 1 && rating <= 5) {
      try {
        await mealPlans.rate(mealPlanId, { rating: Number(rating) });
        fetchMealPlans();
      } catch (error) {
        console.error('Rate meal plan error:', error);
        alert('Failed to rate meal plan');
      }
    }
  };

  const handleDeleteMealPlan = async (mealPlanId) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      try {
        await mealPlans.delete(mealPlanId);
        fetchMealPlans();
      } catch (error) {
        console.error('Delete meal plan error:', error);
        alert('Failed to delete meal plan');
      }
    }
  };

  const createSampleMealPlan = async () => {
    const today = new Date().toISOString().split('T')[0];
    const samplePlan = {
      name: 'Healthy Day Plan',
      date: today,
      dietType: 'none',
      meals: [
        {
          type: 'breakfast',
          name: 'Protein Breakfast',
          items: [
            {
              name: 'Oatmeal',
              quantity: 50,
              unit: 'g',
              category: 'carbs',
              nutrition: { calories: 190, protein: 7, carbs: 34, fat: 4 }
            },
            {
              name: 'Banana',
              quantity: 1,
              unit: 'piece',
              category: 'fruits',
              nutrition: { calories: 105, protein: 1, carbs: 27, fat: 0 }
            }
          ],
          totalNutrition: { calories: 295, protein: 8, carbs: 61, fat: 4 },
          prepTime: 10,
          difficulty: 'easy'
        },
        {
          type: 'lunch',
          name: 'Grilled Chicken Salad',
          items: [
            {
              name: 'Grilled Chicken',
              quantity: 150,
              unit: 'g',
              category: 'protein',
              nutrition: { calories: 165, protein: 31, carbs: 0, fat: 4 }
            },
            {
              name: 'Mixed Greens',
              quantity: 100,
              unit: 'g',
              category: 'vegetables',
              nutrition: { calories: 20, protein: 2, carbs: 4, fat: 0 }
            }
          ],
          totalNutrition: { calories: 185, protein: 33, carbs: 4, fat: 4 },
          prepTime: 15,
          difficulty: 'easy'
        }
      ],
      totalNutrition: { calories: 480, protein: 41, carbs: 65, fat: 8 },
      tags: ['healthy', 'balanced']
    };

    try {
      await mealPlans.create(samplePlan);
      fetchMealPlans();
    } catch (error) {
      console.error('Create sample meal plan error:', error);
      alert('Failed to create sample meal plan');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700">🍽️ Meal Plans</h1>
              <p className="text-gray-600 mt-2">Plan your nutrition for optimal health</p>
            </div>
            <button
              onClick={createSampleMealPlan}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              + Sample Meal Plan
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <select
              value={filters.dietType || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, dietType: e.target.value }))}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Diet Types</option>
              <option value="none">Standard</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
              <option value="mediterranean">Mediterranean</option>
            </select>

            <input
              type="date"
              value={filters.date || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
              className="px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Meal Plans Grid */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : mealPlanList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlanList.map((mealPlan) => (
              <MealPlanCard
                key={mealPlan._id}
                mealPlan={mealPlan}
                onRate={handleRateMealPlan}
                onDelete={handleDeleteMealPlan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No meal plans found. Create your first meal plan!</p>
          </div>
        )}
      </div>
    </div>
  );
}
