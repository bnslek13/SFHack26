import React, { useState, useEffect } from 'react';
import { generateItinerary } from '../itinerary/routeEngine';

function Itinerary() {
  const [organizedItinerary, setOrganizedItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/generatedPlaces.json?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (!data || !data.places || data.places.length === 0) {
            setLoading(false);
            return;
          }
          const organized = generateItinerary(data);
          setOrganizedItinerary(organized);
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, []);

  if (loading) {
    return <div className="itinerary-loading">Building your route...</div>;
  }

  if (!organizedItinerary) {
    return null;
  }

  const totalHours = organizedItinerary.itinerary.reduce((sum, place) => sum + place.durationHours, 0);

  return (
    <div className="itinerary">
      <h3 className="itinerary-title">Your SF Itinerary — {totalHours} hrs</h3>
      <ol className="itinerary-list">
        {organizedItinerary.itinerary.map((place, index) => (
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