const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/generate', async (req, res) => {
  const { budget, duration, preferences } = req.body;

  try {
    const prompt = `
                  Create a meal plan TABLE and shopping list TABLE based on the following preferences:

                  - Budget: $${budget}
                  - Duration: ${duration} days
                  - Food preferences: "${preferences.food}"
                  - Include cleaning supplies and other necessary items.

                  YOU MUST STICK TO THE BUDGET, IF IT IS NOT POSSIBLE, MENTION IT AND GIVE THE CLOSEST PLAN ( PLUS MINUS 5 DOLLAR MARGIN ONLY )
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

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({ plan: data.candidates[0].content.parts[0].text });
    } else {
      console.error('Unexpected Gemini API response:', JSON.stringify(data, null, 2));
      res.status(500).json({ message: 'Failed to get a valid response from Gemini.' });
    }
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ message: 'Error generating plan.' });
  }
});

module.exports = router;
