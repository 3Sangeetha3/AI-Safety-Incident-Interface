import { useMemo, useState, useEffect } from "react";
import {
    AlertTriangle,
    Eye,
    EyeOff,
    Plus,
    Calendar,
    Clock,
    Filter,
    SortDesc,
    Shield,
    Zap,
    BarChart3,
    X,
} from "lucide-react";
import incidentsData from "./data/incidents.json";
import AOS from "aos";
import "aos/dist/aos.css";

export const Dashboard = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);

    const [incidents, setIncidents] = useState(() => {
        const storedIncidents = localStorage.getItem("incidents");
        return storedIncidents ? JSON.parse(storedIncidents) : incidentsData;
    });

    const [expandedId, setExpandedId] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");
    const [filterSeverity, setFilterSeverity] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        severity: "Medium",
    });

    useEffect(() => {
        localStorage.setItem("incidents", JSON.stringify(incidents));
    }, [incidents]);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredIncidents = useMemo(() => {
        if (filterSeverity === "All") return incidents;
        return incidents.filter((incident) => incident.severity === filterSeverity);
    }, [incidents, filterSeverity]);

    const sortedIncidents = useMemo(() => {
        return [...filteredIncidents].sort((a, b) => {
            const dateA = new Date(a.reported_at);
            const dateB = new Date(b.reported_at);
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [filteredIncidents, sortOrder]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Please fill in all fields");
            return;
        }
        // Create new incident
        const newIncident = {
            id:
                incidents.length > 0 ? Math.max(...incidents.map((i) => i.id)) + 1 : 1,
            title: formData.title,
            description: formData.description,
            severity: formData.severity,
            reported_at: new Date().toISOString(),
        };
        // Add to incidents
        setIncidents((prev) => [...prev, newIncident]);
        // Reset form
        setFormData({
            title: "",
            description: "",
            severity: "Medium",
        });
        // Hide form
        setShowForm(false);
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

    // Calculate statistics
    const stats = useMemo(() => {
        const highCount = incidents.filter((i) => i.severity === "High").length;
        const mediumCount = incidents.filter((i) => i.severity === "Medium").length;
        const lowCount = incidents.filter((i) => i.severity === "Low").length;
        return {
            total: incidents.length,
            high: highCount,
            medium: mediumCount,
            low: lowCount,
        };
    }, [incidents]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
            <div className="absolute top-100 right-20 w-64 h-64 bg-teal-500 blur-[2px] rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute top-140 right-10 w-30 h-30 bg-cyan-500 blur-[2px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-18 w-96 h-96 bg-cyan-500 blur-[2px] rounded-full opacity-5 translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-50 left-12 w-40 h-40 bg-teal-500 blur-[2px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-50 left-32 w-20 h-20 bg-cyan-500 blur-[2px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
            <header
                data-aos="fade-down"
                data-aos-once="true"
                className="bg-white shadow-md shadow-teal-500/10"
            >
                <div className="container mx-auto py-8">
                    <h1 className="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                        AI Safety Incident Interface
                    </h1>
                    <p className="text-center text-sm mt-2 text-gray-600">
                        Track and monitor AI safety incidents in one place
                    </p>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-10">
                {/* Statistics */}
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

                <div className="flex flex-col items-center">
                    {/* Form toggle button */}
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

                    {/* Incident form */}
                    {showForm && (
                        <div className="w-full max-w-lg mb-8 p-6 bg-white rounded-lg shadow-lg shadow-teal-500/10 border border-gray-200">
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
                                        rows="4"
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
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-md shadow-teal-500/20 transform hover:translate-y-px flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        <AlertTriangle size={16} />
                                        Submit Incident
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Filters and sorting */}
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

                    {/* Incidents list */}
                    <div className="w-full max-w-5xl">
                        {sortedIncidents.length === 0 ? (
                            <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
                                <p className="text-gray-500">
                                    No incidents found with the current filter.
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {sortedIncidents.map((incident) => (
                                    <li
                                        key={incident.id}
                                        data-aos="fade-up"
                                        className="bg-white p-5 rounded-lg shadow-md shadow-teal-500/10 border border-gray-200 hover:border-teal-300 transition-all duration-300 transform hover:translate-y-px"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-medium text-gray-800">
                                                {incident.title}
                                            </h2>
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
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-white py-6 border-t border-gray-200">
                <div className="container mx-auto text-center">
                    <p className="text-sm text-teal-500">
                        Developed by Jadamal Sangeetha Choudhary
                    </p>
                </div>
            </footer>
        </div>
    );
};
