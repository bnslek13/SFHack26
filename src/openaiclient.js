const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: message,
  });

  res.json({ reply: response.output[0].content[0].text });
});