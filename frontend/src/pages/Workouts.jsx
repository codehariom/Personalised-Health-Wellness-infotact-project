import React, { useState, useEffect } from 'react';
import { workouts } from '../services/api';
import WorkoutCard from '../components/workouts/WorkoutCard';
import WorkoutForm from '../components/workouts/WorkoutForm';

export default function Workouts() {
  const [workoutList, setWorkoutList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchWorkouts();
  }, );

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response = await workouts.getAll(filters);
      setWorkoutList(response.data.workouts || []);
    } catch (error) {
      console.error('Fetch workouts error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteWorkout = async (workoutId) => {
    try {
      await workouts.complete(workoutId, { rating: 5 });
      fetchWorkouts();
    } catch (error) {
      console.error('Complete workout error:', error);
      alert('Failed to complete workout');
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workouts.delete(workoutId);
        fetchWorkouts();
      } catch (error) {
        console.error('Delete workout error:', error);
        alert('Failed to delete workout');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchWorkouts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700">💪 Workouts</h1>
              <p className="text-gray-600 mt-2">Manage your exercise routines</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              {showForm ? 'Cancel' : '+ New Workout'}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <select
              value={filters.type || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Types</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
              <option value="hiit">HIIT</option>
              <option value="yoga">Yoga</option>
            </select>

            <select
              value={filters.difficulty || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="mb-6">
            <WorkoutForm
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Workouts Grid */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : workoutList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutList.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onComplete={handleCompleteWorkout}
                onDelete={handleDeleteWorkout}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No workouts found. Create your first workout!</p>
          </div>
        )}
      </div>
    </div>
  );
}
