import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['cardio', 'strength', 'flexibility'], required: true },
  duration: Number, // minutes
  sets: Number,
  reps: Number,
  instructions: String
}, { _id: false });

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'hiit', 'yoga'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  duration: { type: Number, required: true },
  exercises: [ExerciseSchema],
  estimatedCalories: Number,
  completedAt: Date,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export const Workout = mongoose.model('Workout', WorkoutSchema);