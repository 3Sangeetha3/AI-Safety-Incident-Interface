import React from "react";
import { Calendar, Clock, Eye, EyeOff, Shield, AlertTriangle, Zap } from "lucide-react";

export const IncidentItem = ({ incident, expandedId, toggleExpand }) => {
    const getSeverityStyles = (severity) => {
        switch (severity) {
            case "Low":
                return "bg-green-100 text-green-800 border border-green-300";
            case "Medium":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300";
            case "High":
                return "bg-red-100 text-red-800 border border-red-300";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case "Low":
                return <Shield size={14} className="text-green-600" />;
            case "Medium":
                return <AlertTriangle size={14} className="text-yellow-600" />;
            case "High":
                return <Zap size={14} className="text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <li
            data-aos="fade-up"
            className="bg-white p-5 rounded-lg shadow-md shadow-teal-500/10 border border-gray-200 hover:border-teal-300 transition-all duration-300 transform hover:translate-y-px"
        >
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-medium text-gray-800">{incident.title}</h2>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getSeverityStyles(
                        incident.severity
                    )}`}
                >
                    {getSeverityIcon(incident.severity)}
                    {incident.severity}
                </span>
            </div>
            <div className="mt-3 text-sm text-gray-500 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                    <Calendar size={14} className="text-teal-600" />
                    {new Date(incident.reported_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                    <Clock size={14} className="text-teal-600" />
                    {new Date(incident.reported_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => toggleExpand(incident.id)}
                    className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition-all duration-300 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                    {expandedId === incident.id ? (
                        <>
                            <EyeOff size={16} />
                            Hide Details
                        </>
                    ) : (
                        <>
                            <Eye size={16} />
                            View Details
                        </>
                    )}
                </button>
                {expandedId === incident.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-teal-500/10-inner">
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {incident.description}
                        </p>
                    </div>
                )}
            </div>
        </li>
    );
};
