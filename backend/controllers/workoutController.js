import { Workout } from '../models/Workout.js';

export const createWorkout = async (req, res) => {
  const w = await Workout.create({ userId:req.user.id, ...req.body });
  res.status(201).json({ w });
};

export const getWorkouts = async (req, res) => {
  const { type, difficulty, limit=50 } = req.query;
  const filter = { userId:req.user.id, ...(type&&{type}), ...(difficulty&&{difficulty}) };
  const ws = await Workout.find(filter).sort({createdAt:-1}).limit(Number(limit));
  res.json({ ws });
};

export const getWorkoutById = async (req, res) => {
  const w = await Workout.findOne({ _id:req.params.id, userId:req.user.id });
  if (!w) return res.status(404).json({ message:'Not found' });
  res.json({ w });
};

export const updateWorkout = async (req, res) => {
  const w = await Workout.findOneAndUpdate(
    { _id:req.params.id, userId:req.user.id },
    req.body, { new:true }
  );
  if (!w) return res.status(404).json({ message:'Not found' });
  res.json({ w });
};

export const completeWorkout = async (req, res) => {
  const { rating } = req.body;
  const w = await Workout.findOneAndUpdate(
    { _id:req.params.id, userId:req.user.id },
    { completedAt:new Date(), rating },
    { new:true }
  );
  res.json({ w });
};

export const deleteWorkout = async (req, res) => {
  await Workout.findOneAndDelete({ _id:req.params.id, userId:req.user.id });
  res.json({ message:'Deleted' });
};
