import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { mockIndustries, mockLocations } from '../../data/mockData';

const SearchFilters = ({ filters, setFilters, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const sizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees"
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
          <Filter className="w-4 h-4 text-slate-500" />
          Filter Opportunities
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brand transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Industry Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="industry" className="text-xs font-semibold text-slate-500">Industry</label>
          <select
            id="industry"
            name="industry"
            value={filters.industry}
            onChange={handleChange}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
          >
            <option value="">All Industries</option>
            {mockIndustries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className="text-xs font-semibold text-slate-500">Location</label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
          >
            <option value="">All Locations</option>
            {mockLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="size" className="text-xs font-semibold text-slate-500">Business Size</label>
          <select
            id="size"
            name="size"
            value={filters.size}
            onChange={handleChange}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
          >
            <option value="">All Sizes</option>
            {sizes.map(sz => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
        </div>

        {/* Lead Score Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="scoreRange" className="text-xs font-semibold text-slate-500">Lead Score</label>
          <select
            id="scoreRange"
            name="scoreRange"
            value={filters.scoreRange}
            onChange={handleChange}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
          >
            <option value="">All Scores</option>
            <option value="high">High (&ge; 80)</option>
            <option value="mid">Medium (60-79)</option>
            <option value="low">Low (&lt; 60)</option>
          </select>
        </div>

        {/* Website Audit Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="websiteStatus" className="text-xs font-semibold text-slate-500">Website Status</label>
          <select
            id="websiteStatus"
            name="websiteStatus"
            value={filters.websiteStatus}
            onChange={handleChange}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
          >
            <option value="">All Statuses</option>
            <option value="Audited">Audited</option>
            <option value="Needs Audit">Needs Audit</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
