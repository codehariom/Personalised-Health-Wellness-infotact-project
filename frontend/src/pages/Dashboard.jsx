import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend,
} from "chart.js";
import { useAuth } from "../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { user } = useAuth();
  const [weights, setWeights] = useState([65, 66, 67]);
  const [newWeight, setNewWeight] = useState("");
  const [goal, setGoal] = useState(user?.goal || "");

  const addWeight = () => {
    if (!newWeight) return;
    setWeights(prev => [...prev, Number(newWeight)]);
    setNewWeight("");
  };

  const bmi = useMemo(() => {
    if (!user?.heightCm || weights.length === 0) return null;
    const h = user.heightCm / 100;
    const latest = weights[weights.length - 1];
    return (latest / (h * h)).toFixed(1);
  }, [user?.heightCm, weights]);

  const chartData = {
    labels: weights.map((_, i) => `W${i + 1}`),
    datasets: [
      {
        label: "Weight (kg)",
        data: weights,
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const saveGoal = () => alert(`Goal set to ${goal} kg`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 pt-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">
              Welcome, {user?.name || "Guest"}
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <Stat label="Current BMI" value={bmi || "—"} />
              <Stat label="Goal (kg)" value={goal || "Not set"} />
              <Stat label="Entries" value={weights.length} />
            </div>

            <h3 className="text-lg font-semibold mb-4 text-slate-700">Weight Progress</h3>
            <div className="bg-white rounded-2xl p-4 shadow-inner">
              <Line data={chartData} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Add weight (kg)"
                className="border border-gray-300 rounded-xl px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <button
                onClick={addWeight}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow"
              >
                Add
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Set goal weight (kg)"
                className="border border-gray-300 rounded-xl px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                onClick={saveGoal}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow"
              >
                Save Goal
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition space-y-6">
          <h3 className="text-xl font-semibold text-emerald-700">Recommendations</h3>
          <ul className="text-slate-700 list-disc list-inside space-y-2">
            <li className="hover:bg-emerald-50 p-2 rounded transition">🥗 Eat a high-protein breakfast</li>
            <li className="hover:bg-emerald-50 p-2 rounded transition">🚶 Aim for 8k steps today</li>
            <li className="hover:bg-emerald-50 p-2 rounded transition">🧘 Try 10-min meditation tonight</li>
          </ul>
          <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition">
            Upgrade to Premium
          </button>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition text-center">
      <h4 className="text-sm text-slate-500 mb-1">{label}</h4>
      <p className="text-2xl font-bold text-emerald-700">{value}</p>
    </div>
  );
}