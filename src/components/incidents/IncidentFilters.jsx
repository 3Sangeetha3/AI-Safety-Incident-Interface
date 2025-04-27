import React from 'react';
import { Filter, SortDesc } from 'lucide-react';

export const IncidentFilters = ({ filterSeverity, setFilterSeverity, sortOrder, setSortOrder }) => {
    return (
        <div className="w-full max-w-2xl mb-8 flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm shadow-teal-500/10">
                <Filter size={16} className="text-teal-500 mr-2" />
                <label
                    htmlFor="filter-severity"
                    className="text-gray-700 mr-2 text-sm font-medium"
                >
                    Filter:
                </label>
                <select
                    id="filter-severity"
                    className="bg-gray-50 p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                >
                    <option value="All">All Severity</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm shadow-teal-500/10">
                <SortDesc size={16} className="text-teal-500 mr-2" />
                <label
                    htmlFor="sort-order"
                    className="text-gray-700 mr-2 text-sm font-medium"
                >
                    Sort:
                </label>
                <select
                    id="sort-order"
                    className="bg-gray-50 p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>
    );
};