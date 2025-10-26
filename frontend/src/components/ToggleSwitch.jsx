import React from 'react';

export default function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-800 font-medium">{label}</span>
      
      <button
        onClick={onChange}
        className={`relative w-12 h-7 flex items-center rounded-full transition-all duration-300 focus:outline-none 
          ${checked ? 'bg-emerald-600 shadow-inner' : 'bg-gray-300 hover:bg-gray-400'}`}
      >
        <div
          className={`absolute left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out 
            ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}