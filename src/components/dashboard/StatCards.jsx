import React from 'react';
import { BarChart3, Zap, AlertTriangle, Shield } from 'lucide-react';

export const StatCards = ({ stats }) => {
    return (
        <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
                className="bg-white p-6 rounded-lg border-transparent hover:border hover:border-teal-500 transition-all duration-200 flex items-center justify-between"
                style={{
                    boxShadow:
                        "0 4px 6px -1px rgba(20, 184, 166, 0.1), 0 -4px 6px -1px rgba(20, 184, 166, 0.1), 4px 0 6px -1px rgba(20, 184, 166, 0.1), -4px 0 6px -1px rgba(20, 184, 166, 0.1)",
                }}
            >
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        Total Incidents
                    </p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <BarChart3 size={28} className="text-teal-500" />
            </div>

            <div
                className="bg-white p-4 rounded-lg border-transparent hover:border hover:border-red-500 flex items-center justify-between"
                style={{
                    boxShadow:
                        "0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 -4px 6px -1px rgba(239, 68, 68, 0.1), 4px 0 6px -1px rgba(239, 68, 68, 0.1), -4px 0 6px -1px rgba(239, 68, 68, 0.1)",
                }}
            >
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        High Severity
                    </p>
                    <p className="text-3xl font-bold text-red-600">{stats.high}</p>
                </div>
                <Zap size={28} className="text-red-500" />
            </div>

            <div
                className="bg-white p-4 rounded-lg border-transparent hover:border hover:border-yellow-500 flex items-center justify-between"
                style={{
                    boxShadow:
                        "0 4px 6px -1px rgba(234, 179, 8, 0.1), 0 -4px 6px -1px rgba(234, 179, 8, 0.1), 4px 0 6px -1px rgba(234, 179, 8, 0.1), -4px 0 6px -1px rgba(234, 179, 8, 0.1)",
                }}
            >
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        Medium Severity
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                        {stats.medium}
                    </p>
                </div>
                <AlertTriangle size={28} className="text-yellow-500" />
            </div>
            <div
                className="bg-white p-4 rounded-lg border-transparent hover:border hover:border-green-500 flex items-center justify-between"
                style={{
                    boxShadow:
                        "0 4px 6px -1px rgba(22, 163, 74, 0.1), 0 -4px 6px -1px rgba(22, 163, 74, 0.1), 4px 0 6px -1px rgba(22, 163, 74, 0.1), -4px 0 6px -1px rgba(22, 163, 74, 0.1)",
                }}
            >
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        Low Severity
                    </p>
                    <p className="text-3xl font-bold text-green-600">{stats.low}</p>
                </div>
                <Shield size={28} className="text-green-500" />
            </div>
        </div>
    );
};