import React from 'react';
import { Search } from 'lucide-react';

const QuickSearch = ({ onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Property Search</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Location..."
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="sm:w-48">
          <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white">
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="sm:w-48">
          <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white">
            <option value="">Price Range</option>
            <option value="0-5000000">0 - 5M</option>
            <option value="5000000-10000000">5M - 10M</option>
            <option value="10000000-20000000">10M - 20M</option>
            <option value="20000000+">20M+</option>
          </select>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
};

export default QuickSearch;

