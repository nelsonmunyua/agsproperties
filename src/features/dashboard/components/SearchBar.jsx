import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2.5 ${className}`}>
      <Search className="w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 flex-1"
      />
    </div>
  );
};

export default SearchBar;

