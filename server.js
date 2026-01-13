import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const { model, prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(express.static("."));

app.listen(process.env.PORT || 3000);
