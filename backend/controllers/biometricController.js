import { BiometricEntry } from '../models/BiometricEntry.js';

export const createEntry = async (req, res) => {
  const entry = await BiometricEntry.create({ userId: req.user.id, ...req.body });
  res.status(201).json({ entry });
};

export const listEntries = async (req, res) => {
  const { type, limit=50 } = req.query;
  const filter = { userId: req.user.id, ...(type && { type }) };
  const entries = await BiometricEntry.find(filter).sort({ recordedAt:-1 }).limit(Number(limit));
  res.json({ entries });
};

export const getLatestEntry = async (req, res) => {
  const entry = await BiometricEntry.findOne({ userId: req.user.id }).sort({ recordedAt:-1 });
  if (!entry) return res.status(404).json({ message: 'No entries' });
  res.json({ entry });
};

export const updateEntry = async (req, res) => {
  const entry = await BiometricEntry.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!entry) return res.status(404).json({ message: 'Not found' });
  res.json({ entry });
};

export const deleteEntry = async (req, res) => {
  await BiometricEntry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
};
