import { useState, useEffect, useMemo } from 'react';
import incidentsData from '../data/incidents.json';

export const useIncidents = () => {
    const [incidents, setIncidents] = useState(() => {
        const storedIncidents = localStorage.getItem("incidents");
        return storedIncidents ? JSON.parse(storedIncidents) : incidentsData;
    });

    const [expandedId, setExpandedId] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");
    const [filterSeverity, setFilterSeverity] = useState("All");

    useEffect(() => {
        localStorage.setItem("incidents", JSON.stringify(incidents));
    }, [incidents]);

    // expand/collapse
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };


    // Filter - low, medium, high, all
    const filteredIncidents = useMemo(() => {
        if (filterSeverity === "All") return incidents;
        return incidents.filter((incident) => incident.severity === filterSeverity);
    }, [incidents, filterSeverity]);


    // Sort - newest, oldest
    const sortedIncidents = useMemo(() => {
        return [...filteredIncidents].sort((a, b) => {
            const dateA = new Date(a.reported_at);
            const dateB = new Date(b.reported_at);
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [filteredIncidents, sortOrder]);

    // New Incident
    const addIncident = (incidentData) => {
        const newIncident = {
            id: incidents.length > 0 ? Math.max(...incidents.map((i) => i.id)) + 1 : 1,
            title: incidentData.title,
            description: incidentData.description,
            severity: incidentData.severity,
            reported_at: new Date().toISOString(),
        };
        setIncidents((prev) => [...prev, newIncident]);
        return newIncident;
    };

    // statistics count
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

    return {
        incidents,
        setIncidents,
        expandedId,
        toggleExpand,
        sortOrder,
        setSortOrder,
        filterSeverity,
        setFilterSeverity,
        filteredIncidents,
        sortedIncidents,
        addIncident,
        stats
    };
};