import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workouts } from '../services/api';

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkout();
  }, );

  const fetchWorkout = async () => {
    try {
      const response = await workouts.getById(id);
      setWorkout(response.data.workout);
    } catch (error) {
      console.error('Fetch workout error:', error);
      navigate('/workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await workouts.complete(id, { rating: 5 });
      fetchWorkout();
    } catch (error) {
      console.error('Complete workout error:', error);
      alert('Failed to complete workout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!workout) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">{workout.name}</h1>
            <p className="text-gray-600 mt-1">{workout.type} • {workout.difficulty} • {workout.duration} min</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/workouts')}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              ← Back
            </button>
            {!workout.completedAt && (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                Complete Workout
              </button>
            )}
          </div>
        </div>

        {/* Completion Status */}
        {workout.completedAt && (
          <div className="p-4 bg-green-50 rounded-2xl text-green-700 font-medium">
            ✅ Completed on {new Date(workout.completedAt).toLocaleDateString()}
            {workout.rating && ` • Rated ${workout.rating}/5 ⭐`}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Exercises" value={workout.exercises?.length || 0} color="emerald" />
          <StatCard label="Minutes" value={workout.duration} color="emerald" />
          <StatCard label="Est. Calories" value={workout.estimatedCalories || 'N/A'} color="emerald" />
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          {workout.exercises?.map((exercise, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">{exercise.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {exercise.sets && <Tag label={`Sets: ${exercise.sets}`} color="emerald" />}
                {exercise.reps && <Tag label={`Reps: ${exercise.reps}`} color="teal" />}
                {exercise.duration && <Tag label={`Duration: ${exercise.duration} min`} color="indigo" />}
                {exercise.weight && <Tag label={`Weight: ${exercise.weight} kg`} color="rose" />}
              </div>
              {exercise.instructions && (
                <p className="text-gray-600 text-sm">{exercise.instructions}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub Components ---------- */
function StatCard({ label, value, color }) {
  return (
    <div className={`bg-${color}-50 rounded-2xl p-4 text-center`}>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span className={`text-sm bg-${color}-100 text-${color}-700 px-2 py-1 rounded-full`}>
      {label}
    </span>
  );
}