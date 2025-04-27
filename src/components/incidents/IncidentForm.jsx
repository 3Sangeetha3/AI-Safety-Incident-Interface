import React, { useState } from 'react';
import { AlertTriangle, X, Plus, Shield, Zap } from 'lucide-react';

export const IncidentForm = ({ onSubmit, showForm, setShowForm }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        severity: "Medium",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Please fill in all fields");
            return;
        }

        onSubmit(formData);

        setFormData({
            title: "",
            description: "",
            severity: "Medium",
        });
    };

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
        <>
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-8 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md shadow-teal-500/20 flex items-center gap-2 font-medium transform hover:scale-105"
            >
                {showForm ? (
                    <>
                        <X size={18} />
                        Cancel
                    </>
                ) : (
                    <>
                        <Plus size={18} />
                        Report New Incident
                    </>
                )}
            </button>

            {/* Incident input Form */}
            {showForm && (
                <div className="w-full max-w-5xl mb-8 p-6 bg-white rounded-lg shadow-lg shadow-teal-500/10 border border-gray-200">
                    <h2 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-2">
                        <AlertTriangle size={22} />
                        Report New Incident
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 transition-all duration-200"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 transition-all duration-200"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Severity
                            </label>
                            <div className="flex gap-4">
                                {["Low", "Medium", "High"].map((severity) => (
                                    <label
                                        key={severity}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="severity"
                                            value={severity}
                                            checked={formData.severity === severity}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${formData.severity === severity
                                                    ? getSeverityStyles(severity)
                                                    : "bg-gray-100 text-gray-500 border border-gray-300"
                                                } transition-colors duration-300 hover:shadow-md shadow-teal-500/10 flex items-center gap-2`}
                                        >
                                            {getSeverityIcon(severity)}
                                            {severity}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-md shadow-teal-500/20 transform hover:translate-y-px flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                Submit Incident
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};