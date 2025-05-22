const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/btp', async (req, res) => {
  const { plan } = req.body;

  try {
    const prompt = `
                  Estimate the total cost of the following plan. Include approximate prices for groceries, meals, and other items mentioned. Present the result in a clear and structured format.
                  HIGHLIGHT THE OVERALL PRICE AT THE BEGINNING
                  Plan details:
                  ${plan}
                  DO NOT ANSWER ANYTHING OUT OF THE CONTEXT OF THIS PROMPT
                  `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Non-JSON response from Gemini:', text);
      return res.status(500).json({ message: 'Error parsing response from Gemini API.' });
    }

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({ budget: data.candidates[0].content.parts[0].text });
    } else {
      console.error('Unexpected Gemini API response:', JSON.stringify(data, null, 2));
      res.status(500).json({ message: 'Failed to get a valid response from Gemini.' });
    }
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ message: 'Error estimating budget.' });
  }
});

module.exports = router;
