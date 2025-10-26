import { MealPlan } from '../models/MealPlan.js';

export const createMealPlan = async (req, res) => {
  const m = await MealPlan.create({ userId:req.user.id, ...req.body });
  res.status(201).json({ m });
};

export const getMealPlans = async (req, res) => {
  const { date, limit=50 } = req.query;
  const filter = { userId:req.user.id };
  if (date) { 
    const d=new Date(date), nd=new Date(d); nd.setDate(d.getDate()+1);
    filter.date={ $gte:d,$lt:nd };
  }
  const ms = await MealPlan.find(filter).sort({date:-1}).limit(Number(limit));
  res.json({ ms });
};

export const getMealPlanById = async (req, res) => {
  const m = await MealPlan.findOne({ _id:req.params.id, userId:req.user.id });
  if (!m) return res.status(404).json({ message:'Not found' });
  res.json({ m });
};

export const updateMealPlan = async (req, res) => {
  const m = await MealPlan.findOneAndUpdate(
    { _id:req.params.id, userId:req.user.id },
    req.body, { new:true }
  );
  res.json({ m });
};

export const rateMealPlan = async (req, res) => {
  const m = await MealPlan.findOneAndUpdate(
    { _id:req.params.id, userId:req.user.id },
    { rating:req.body.rating }, { new:true }
  );
  res.json({ m });
};

export const deleteMealPlan = async (req, res) => {
  await MealPlan.findOneAndDelete({ _id:req.params.id, userId:req.user.id });
  res.json({ message:'Deleted' });
};
