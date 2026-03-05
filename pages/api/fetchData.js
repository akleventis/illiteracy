import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEM_KEY });

export default async function handler(req, res) {
  try {
    const prompt = req.body.prompt;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
    });
    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("fetchData error:", error);
    res.status(500).json({ error: "Error fetching data: " + error });
  }
}
