import React from 'react';
import { generateItinerary } from '../itinerary/routeEngine';

function Itinerary({ data }) {
  const organized = generateItinerary(data);
  const totalHours = organized.itinerary.reduce((sum, p) => sum + p.durationHours, 0);

  return (
    <div className="itinerary">
      <h3 className="itinerary-title">Your SF Itinerary — {totalHours} hrs</h3>
      <ol className="itinerary-list">
        {organized.itinerary.map((place, index) => (
          <li key={index} className="itinerary-item">
            <span className="itinerary-step">{index + 1}</span>
            <div className="itinerary-info">
              <strong className="itinerary-name">{place.name}</strong>
              <span className="itinerary-meta">{place.category} · {place.durationHours} hr{place.durationHours !== 1 ? 's' : ''}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Itinerary;