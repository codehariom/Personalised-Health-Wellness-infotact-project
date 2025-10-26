import React, { useState } from 'react';
import { recommendations } from '../services/api';
import RecommendationList from '../components/recommendations/RecommendationList';

export default function Recommendations() {
  const [filters, setFilters] = useState({ status: 'pending' });
  const [generating, setGenerating] = useState(false);

  const handleGenerateRecommendations = async () => {
    setGenerating(true);
    try {
      await recommendations.generate();
      // Trigger refresh by updating filters
      setFilters(prev => ({ ...prev }));
    } catch (error) {
      console.error('Generate recommendations error:', error);
      alert('Failed to generate recommendations');
    } finally {
      setGenerating(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700">💡 Recommendations</h1>
              <p className="text-gray-600 mt-2">AI-powered suggestions for your wellness journey</p>
            </div>
            <button
              onClick={handleGenerateRecommendations}
              disabled={generating}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              {generating ? 'Generating...' : '🔄 Generate New'}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="dismissed">Dismissed</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Types</option>
              <option value="workout">Workouts</option>
              <option value="meal">Meals</option>
              <option value="wellness">Wellness</option>
              <option value="goal">Goals</option>
            </select>
          </div>
        </div>

        {/* Recommendations List */}
        <RecommendationList filters={filters} />
      </div>
    </div>
  );
}
