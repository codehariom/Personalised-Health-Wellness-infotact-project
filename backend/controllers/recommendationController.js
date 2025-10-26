import { Recommendation } from '../models/Recommendation.js';
import { generateRecommendations } from '../utils/aiRecommendations.js';

export const getRecommendations = async (req, res) => {
  const { type, status, limit=10 } = req.query;
  const filter = { userId:req.user.id, ...(type&&{type}), ...(status&&{status}) };
  const recs = await Recommendation.find(filter).sort({priority:-1,createdAt:-1}).limit(Number(limit));
  res.json({ recs });
};

export const generateNewRecommendations = async (req, res) => {
  const recs = await generateRecommendations(req.user.id);
  res.json({ generated: recs.length, recs });
};

export const updateRecommendationStatus = async (req, res) => {
  const { status } = req.body;
  const rec = await Recommendation.findOneAndUpdate(
    { _id:req.params.id, userId:req.user.id },
    { status },
    { new:true }
  );
  res.json({ rec });
};

export const getRecommendationStats = async (req, res) => {
  const stats = await Recommendation.aggregate([
    { $match:{ userId:req.user.id } },
    { $group:{ _id:'$status', count:{ $sum:1 } } }
  ]);
  res.json({ stats });
};

export const deleteRecommendation = async (req, res) => {
  await Recommendation.findOneAndDelete({ _id:req.params.id, userId:req.user.id });
  res.json({ message:'Deleted' });
};
