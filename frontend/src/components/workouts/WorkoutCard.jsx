import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutCard = ({ workout, onComplete, onDelete }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const icons = {
      cardio: '🏃‍♂️',
      strength: '🏋️‍♀️',
      flexibility: '🧘‍♀️',
      hiit: '⚡',
      yoga: '🧘',
      custom: '💪'
    };
    return icons[type] || '💪';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getTypeIcon(workout.type)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
            <p className="text-sm text-gray-600">
              {workout.duration} min • {workout.exercises?.length || 0} exercises
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
          {workout.difficulty}
        </span>
      </div>

      {workout.estimatedCalories && (
        <p className="text-sm text-gray-600 mb-4">🔥 Est. {workout.estimatedCalories} calories</p>
      )}

      <div className="flex justify-between items-center">
        <Link
          to={`/workouts/${workout._id}`}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          View Details
        </Link>
        
        <div className="flex space-x-2">
          {!workout.completedAt && (
            <button
              onClick={() => onComplete(workout._id)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Complete
            </button>
          )}
          <button
            onClick={() => onDelete(workout._id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {workout.completedAt && (
        <div className="mt-3 p-2 bg-green-50 rounded">
          <p className="text-sm text-green-700">
            ✅ Completed on {new Date(workout.completedAt).toLocaleDateString()}
            {workout.rating && ` • Rated ${workout.rating}/5 ⭐`}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;
