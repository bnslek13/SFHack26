const express = require('express');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src', '.env') });
const { buildRecommendPlacesPrompt } = require('./src/prompt/recomendPlacesPrompt');

const app = express();
const port = 3001;

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/recommend-places', async (req, res) => {
  const { hours, userInput } = req.body;

  try {
    const prompt = buildRecommendPlacesPrompt(hours, userInput);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    const content = response.choices[0].message.content
      .replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(content);

    // Save to generatedPlaces.json
    const filePath = path.join(__dirname, 'public', 'generatedPlaces.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating itinerary' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});