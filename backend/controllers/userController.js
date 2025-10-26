import { User } from '../models/User.js';

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message:'Not found' });
  res.json({ user });
};

export const updateMyProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new:true }).select('-passwordHash');
  if (!user) return res.status(404).json({ message:'Not found' });
  res.json({ user });
};
