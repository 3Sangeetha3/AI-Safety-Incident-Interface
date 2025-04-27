import React from 'react';
import { IncidentItem } from './IncidentItem';

export const IncidentList = ({ incidents, expandedId, toggleExpand }) => {
  return (
    <div className="w-full max-w-5xl">
      {incidents.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-500">
            No incidents found with the current filter.
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {incidents.map((incident) => (
            <IncidentItem 
              key={incident.id}
              incident={incident}
              expandedId={expandedId}
              toggleExpand={toggleExpand}
            />
          ))}
        </ul>
      )}
    </div>
  );
};