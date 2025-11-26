const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
                    You are the official AI assistant for the Hunger Pangs web application.

                    Hunger Pangs is a food-sharing platform where:
                    - Donors give away surplus food.
                    - Users find available food.
                    - A user must log in to donate or claim food.
                    - Donation cards include donor name, address, description, phone, expiry time.
                    - Each donation has a status: available, claimed, completed.

                    Your job:
                    - Help users understand how the website works.
                    - Explain donation steps.
                    - Explain claiming steps.
                    - Help with login/register.
                    - Answer only Hunger Pangs–related questions.
                    - Use simple, friendly steps.
                    - Keep the answers short and under 3 lines.
                    - Avoid long explanations.
                    `
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chatbot error occurred." });
    }
});

module.exports = router;
