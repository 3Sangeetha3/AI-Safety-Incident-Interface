import React, { useState, useEffect } from "react";
import { Layout } from '../../components/ui/Layout';
import { StatCards } from '../../components/dashboard/StatCards';
import { IncidentForm } from '../../components/incidents/IncidentForm';
import { IncidentFilters } from '../../components/incidents/IncidentFilters';
import { IncidentList } from '../../components/incidents/IncidentList';
import { useIncidents } from '../../hooks/useIncidents';
import AOS from "aos";
import "aos/dist/aos.css";

export const Dashboard = () => {
    const { stats, expandedId, toggleExpand, sortOrder, setSortOrder, filterSeverity, setFilterSeverity, sortedIncidents, addIncident } = useIncidents();
    const [showForm, setShowForm] = useState(false);

    // Aos Initialization for animations
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);

    const handleFormSubmit = (formData) => {
        addIncident(formData);
        setShowForm(false);
    };

    return (
        <Layout>
            {/* Statistics */}
            <StatCards stats={stats} />

            <div className="flex flex-col items-center">
                {/* Form for adding new incidents */}
                <IncidentForm
                    onSubmit={handleFormSubmit}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />

                {/* Filters and sorting */}
                <IncidentFilters
                    filterSeverity={filterSeverity}
                    setFilterSeverity={setFilterSeverity}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                {/* Incidents list */}
                <IncidentList
                    incidents={sortedIncidents}
                    expandedId={expandedId}
                    toggleExpand={toggleExpand}
                />
            </div>
        </Layout>
    );
};

export default Dashboard;