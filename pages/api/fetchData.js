import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEM_KEY });

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  // "gemini-3.1-flash-lite-preview",
];

function isOverloaded(error) {
  const msg = String(error);
  return msg.includes('"code": 503') || msg.includes("UNAVAILABLE") || msg.includes("high demand");
}

export default async function handler(req, res) {
  const prompt = req.body.prompt;
  let lastError;

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: "You are a text editor. Return only the corrected or improved text. No explanations, no options, no commentary, no formatting — just the text itself.",
        },
      });
      return res.status(200).json({ text: response.text });
    } catch (error) {
      if (isOverloaded(error)) {
        console.warn(`Model ${model} overloaded, trying next...`);
        lastError = error;
        continue;
      }
      console.error("fetchData error:", error);
      return res.status(500).json({ error: "Error fetching data: " + error });
    }
  }

  console.error("All models overloaded:", lastError);
  res.status(503).json({ error: "All models are currently overloaded. Please try again later." });
}
