import axios from "axios";
import Interview from "../models/Interview.js";

export const evaluateAnswer = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const prompt = `
    You are an interview evaluator.
    Question: ${question}
    Candidate Answer: ${answer}

    Give feedback including:
    - correctness
    - missing points
    - grammar issues
    - improvement advice
    - score out of 10
    `;

        const aiRes = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const feedback = aiRes.data.choices[0].message.content;

        const newRecord = await Interview.create({
            question,
            answer,
            feedback,
            score: 8
        });

        res.json({ feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI Evaluation Error" });
    }
};
