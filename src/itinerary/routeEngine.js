const DURATION_WEIGHTS = {
    viewpoint: 1,
    nature: 1,
    food: 2,
    museum: 2,
    entertainment: 2,
    nightlife: 2,
    shopping: 3,
};

function assignTimeByCategory(places, totalHours) {
    const totalMinutes = totalHours * 60;
    let totalWeight = 0;

    places.forEach(place => {
        totalWeight += DURATION_WEIGHTS[place.category] ?? 1;
    });

    places.forEach(place => {
        place.durationMinutes = Math.round(((DURATION_WEIGHTS[place.category] ?? 1) / totalWeight) * totalMinutes);
    });

    return places;
}

function getDistance(point1, point2) {
    const dx = point1.lat - point2.lat;
    const dy = point1.lng - point2.lng;
    return Math.sqrt(dx * dx + dy * dy);
}

function orderByProximity(startLocation, places) {
    let current = startLocation;
    let remaining = [...places];
    let ordered = [];

    while (remaining.length > 0) {
        let closest = remaining[0];

        remaining.forEach(place => {
            if (getDistance(current, place) < getDistance(current, closest)) {
                closest = place;
            }
        });

        ordered.push(closest);
        current = closest;
        remaining = remaining.filter(place => place !== closest);
    }

    return ordered;
}

export function generateItinerary(chatbotResponse) {
    const { totalHours, startLocation, places } = chatbotResponse;

    const placesWithTime = assignTimeByCategory(places, totalHours);
    const orderedPlaces = orderByProximity(startLocation, placesWithTime);

    orderedPlaces.forEach(place => {
        place.durationHours = Math.round((place.durationMinutes / 60) * 2) / 2;
        delete place.durationMinutes;
    });

    return {
        startLocation,
        itinerary: orderedPlaces
    };
}