import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
}, { _id: false });

const MealItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  unit: String,
  nutrition: NutritionSchema
}, { _id: false });

const MealSchema = new mongoose.Schema({
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  name: { type: String, required: true },
  items: [MealItemSchema],
  totalNutrition: NutritionSchema
}, { _id: false });

const MealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  meals: [MealSchema],
  totalNutrition: NutritionSchema,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export const MealPlan = mongoose.model('MealPlan', MealPlanSchema);