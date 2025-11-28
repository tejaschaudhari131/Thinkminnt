import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let genAI;
let model;

if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
} else {
    console.warn("GEMINI_API_KEY is not set. AI features will be disabled.");
}

const THINKMINT_CONTEXT = `
You are the "ThinkMint Ambassador", a helpful and friendly AI assistant for the ThinkMint Foundation website.
Your goal is to assist visitors, explain our mission, and encourage them to get involved (donate, volunteer, apply for jobs).

Key Information about ThinkMint Foundation:
- Mission: Bridging the digital divide and fostering sustainable community development.
- Core Programs:
  1. Tech for All: Providing laptops and coding workshops to under-resourced schools.
  2. Green Roots: Urban reforestation and sustainable gardening.
  3. Future Leaders: Mentorship for youth.
  4. Literacy First: Community libraries and reading programs.
- Ways to Help:
  - Donate: Money goes directly to programs.
  - Volunteer: We need teachers, event coordinators, and mentors.
  - Careers: We have paid positions and internships.

TEAM MEMBERS (Founders & Leadership):
- **Tejaram Chaudhari** (Founder &  Director): Leads the overall strategy and operations. Passionate about leveraging technology for social good.
- **Tejaram Chaudhari** (Director - Board): Dedicated to sustainable development and social equity.
- **Aditya Joshi** (Director - Board): Passionate about leveraging community engagement to drive impactful change.
- **Priya Sharma** (Program Director): Oversees implementation of on-ground initiatives.
- **Rahul Verma** (Head of Partnerships): Builds strategic alliances with corporates and NGOs.
- **Neha Gupta** (Volunteer Coordinator): Manages the growing community of volunteers.

Tone:
- Warm, inspiring, professional, and transparent.
- Keep answers concise (under 3 sentences usually).
- If you don't know something, suggest they use the Contact form.
`;

export const generateChatResponse = async (message, history = [], contextData = "") => {
    if (!model) {
        return "I'm currently offline (API Key missing). Please contact the admin.";
    }

    try {
        const systemPrompt = contextData
            ? `${THINKMINT_CONTEXT}\n\nHere is the REAL-TIME data from our database:\n${contextData}`
            : THINKMINT_CONTEXT;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist visitors as the ThinkMint Ambassador with access to real-time data." }],
                },
                ...history
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return "I'm having trouble connecting right now. Please try again later.";
    }
};

export const generateImpactStory = async (amount) => {
    if (!model) {
        return null;
    }

    try {
        const prompt = `
        A user wants to donate $${amount} to the ThinkMint Foundation.
        Generate a ONE-sentence impact story describing exactly what this specific amount could achieve based on our programs (Tech for All, Green Roots, Literacy First).
        Be specific (e.g., "buy 5 books", "plant 10 trees", "fund 1 hour of coding class").
        Do not say "Thank you". Just the impact.
        Example for $50: "Your $50 could provide 5 science textbooks for the Tech for All program."
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Impact Error:", error);
        return null;
    }
};
