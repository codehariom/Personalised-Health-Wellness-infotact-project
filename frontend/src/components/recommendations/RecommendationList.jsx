import React, { useState, useEffect } from 'react';
import { recommendations } from '../../services/api';
import RecommendationCard from './RecommendationCard';
import { Loader2 } from 'lucide-react';

const RecommendationList = ({ filters }) => {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [filters]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await recommendations.getAll(filters);
      setRecs(response.data.recommendations || []);
    } catch (error) {
      console.error('Fetch recommendations error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state (centered spinner + hint text)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="animate-spin text-emerald-600 w-8 h-8 mb-3" />
        <p className="text-sm text-gray-500">Fetching personalized recommendations...</p>
      </div>
    );
  }

  // ✅ Empty state (with illustration-style placeholder)
  if (recs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">💡</span>
        </div>
        <p className="text-gray-600 font-medium">No recommendations found</p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  // ✅ Animated grid layout for cards
  return (
    
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {recs.map((rec, index) => (
          <div
            key={rec._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <RecommendationCard recommendation={rec} onUpdate={fetchRecommendations} />
          </div>
        ))}
      </div>
  );
};

export default RecommendationList;