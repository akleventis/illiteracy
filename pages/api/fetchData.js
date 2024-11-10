export default async function handler(req, res) {
    const apiKey = process.env.REACT_APP_GEM_KEY;
  
    try {
      const prompt = req.body.prompt;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.log("async fetch error: ", error)
      res.status(500).json({ error: "Error fetching dataa" });
    }
  }