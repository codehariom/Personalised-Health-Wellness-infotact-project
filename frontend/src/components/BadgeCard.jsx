import React from 'react';

export default function BadgeCard({ title, desc, icon }) {
  return (
    <div
      className="group bg-white p-6 rounded-3xl shadow-md border border-emerald-100
                 hover:shadow-xl hover:border-emerald-200 transition-all 
                 duration-300 ease-in-out transform hover:-translate-y-2
                 text-center flex flex-col items-center justify-center"
    >
      {/* Icon */}
      <div className="text-5xl mb-4 text-emerald-600 drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-emerald-700 mb-2 tracking-wide group-hover:text-emerald-800">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs group-hover:text-gray-700">
        {desc}
      </p>
    </div>
  );
}