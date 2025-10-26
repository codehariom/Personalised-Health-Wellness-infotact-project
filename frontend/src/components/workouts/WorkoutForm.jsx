import React, { useState } from 'react';
import { workouts } from '../../services/api';

const WorkoutForm = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    type: 'strength',
    difficulty: 'beginner',
    duration: '',
    exercises: [{ name: '', type: 'strength', sets: '', reps: '', duration: '' }],
    estimatedCalories: '',
    equipment: [],
    tags: []
  });
  const [loading, setLoading] = useState(false);

  const addExercise = () => {
    setForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', type: 'strength', sets: '', reps: '', duration: '' }]
    }));
  };

  const updateExercise = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => 
        i === index ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const removeExercise = (index) => {
    setForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        estimatedCalories: form.estimatedCalories ? Number(form.estimatedCalories) : undefined,
        exercises: form.exercises.map(ex => ({
          ...ex,
          sets: ex.sets ? Number(ex.sets) : undefined,
          reps: ex.reps ? Number(ex.reps) : undefined,
          duration: ex.duration ? Number(ex.duration) : undefined
        }))
      };
      await workouts.create(payload);
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Create workout error:', error);
      alert('Failed to create workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">Create New Workout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Workout name"
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="p-2 border rounded"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
            className="p-2 border rounded"
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={form.difficulty}
            onChange={(e) => setForm(prev => ({ ...prev, difficulty: e.target.value }))}
            className="p-2 border rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={(e) => setForm(prev => ({ ...prev, duration: e.target.value }))}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Est. calories"
            value={form.estimatedCalories}
            onChange={(e) => setForm(prev => ({ ...prev, estimatedCalories: e.target.value }))}
            className="p-2 border rounded"
          />
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Exercises</h3>
            <button
              type="button"
              onClick={addExercise}
              className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              + Add Exercise
            </button>
          </div>

          {form.exercises.map((exercise, index) => (
            <div key={index} className="border rounded p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Exercise {index + 1}</h4>
                {form.exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  className="p-2 border rounded text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Duration (min)"
                  value={exercise.duration}
                  onChange={(e) => updateExercise(index, 'duration', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            {loading ? 'Creating...' : 'Create Workout'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
