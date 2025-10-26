import { User } from '../models/User.js';
import { BiometricEntry } from '../models/BiometricEntry.js';
import { Recommendation } from '../models/Recommendation.js';

export const generateRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentBiometrics = await BiometricEntry.find({
      userId,
      recordedAt: { $gte: weekAgo }
    }).sort({ recordedAt: -1 });

    const recommendations = [];

    const stepsData = recentBiometrics.filter(b => b.type === 'steps');
    if (stepsData.length > 0) {
      const avgSteps = stepsData.reduce((sum, entry) => sum + entry.value, 0) / stepsData.length;
      
      if (avgSteps < 5000) {
        recommendations.push({
          userId,
          type: 'workout',
          title: 'Increase Daily Activity',
          description: 'Try a 20-minute walk or light cardio exercise',
          reasoning: `Average steps: ${Math.round(avgSteps)}/day. Recommended: 8,000+ steps`,
          priority: 'high',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
      }
    }

    const goals = user.goals || [];
    const weightGoal = goals.find(g => g.type === 'weight');
    if (weightGoal && user.profile?.weightKg) {
      const currentWeight = user.profile.weightKg;
      const targetWeight = weightGoal.target;
      
      if (currentWeight > targetWeight) {
        recommendations.push({
          userId,
          type: 'meal',
          title: 'Healthy Weight Loss Plan',
          description: 'Focus on balanced, calorie-controlled meals',
          reasoning: `Current: ${currentWeight}kg, Target: ${targetWeight}kg`,
          priority: 'medium',
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        });
      }
    }

    const savedRecommendations = await Recommendation.insertMany(recommendations);
    return savedRecommendations;
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    throw error;
  }
};