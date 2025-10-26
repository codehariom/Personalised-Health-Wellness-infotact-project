import React, { useState } from 'react';
import { biometrics } from '../services/api';

export default function DataInput() {
  const [selectedType, setSelectedType] = useState('weight');
  const [value, setValue] = useState('');
  const [recordedAt, setRecordedAt] = useState(new Date().toISOString().slice(0, 16));
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const biometricTypes = [
    { value: 'weight', label: 'Weight', unit: 'kg' },
    { value: 'heart_rate', label: 'Heart Rate', unit: 'bpm' },
    { value: 'steps', label: 'Steps', unit: 'steps' },
    { value: 'sleep', label: 'Sleep', unit: 'hours' },
    { value: 'calories', label: 'Calories', unit: 'kcal' },
    { value: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg' },
    { value: 'spo2', label: 'Blood Oxygen', unit: '%' }
  ];

  const currentType = biometricTypes.find(type => type.value === selectedType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      setMsg('Please enter a value');
      return;
    }
    
    setMsg('');
    setLoading(true);
    try {
      await biometrics.create({
        type: selectedType,
        value: Number(value),
        unit: currentType.unit,
        source: 'manual',
        recordedAt: new Date(recordedAt).toISOString()
      });
      setMsg('Biometric data saved successfully!');
      setValue('');
      setRecordedAt(new Date().toISOString().slice(0, 16));
    } catch (err) {
      setMsg(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-24'>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Add Biometric Data
        </h2>

        {msg && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              msg.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            } text-center`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Data Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {biometricTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentType.label} ({currentType.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter ${currentType.label.toLowerCase()} in ${currentType.unit}`}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              required
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              value={recordedAt}
              onChange={(e) => setRecordedAt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition shadow"
          >
            {loading ? 'Saving...' : 'Save Data'}
          </button>
        </form>
      </div>
    </div>
  );
}