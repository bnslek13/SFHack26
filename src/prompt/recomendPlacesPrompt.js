function buildRecommendPlacesPrompt(userInput) {
  return `
You are an SF itinerary recommendation assistant.

Based on the user's request, recommend fun San Francisco places within the users distrct.

Return ONLY valid JSON. No markdown. No explanation.

User request:
"${userInput}"

Return this exact JSON structure:

{
  "totalHours": 4,
  "places": [
    {
      "name": "Sightglass Coffee",
      "category": "food",
      "lat": 37.7877,
      "lng": -122.3965
    },
}

Rules:
- Recommend 5 to 8 places.
- Only include places in the district the user is in.
- Match the user's vibe, budget, and interests.
- Keep reasons short.
`;
}

module.exports = { buildRecommendPlacesPrompt };