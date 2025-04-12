import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GEMINI_API_KEY } from "../utlis/config.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chatController = {
    chatRes: async (req, res) => {
        try {
            const { message } = req.body;
            let userMessage = message.trim().toLowerCase();
            let aiResponse = "";
            if (userMessage.toLowerCase() === "hi") {
                userMessage = "I'm your communication trainer. Are you ready? And say hi,.";
            }

            if (userMessage.toLowerCase() === "hello") {
                userMessage = "I'm your communication trainer. Are you ready? And say hello,.";
            }
            // Handle predefined responses for "hi" and "hello"

            // Initialize Gemini Model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Exponential Backoff for API Rate Limits
            let retries = 1; // Max retries
            let delay = 5000; // Initial delay (5s)

            for (let i = 0; i < retries; i++) {
                try {
                    const result = await model.generateContent([userMessage]);
                    aiResponse = result?.response?.text() || "No response received.";
                    console.log("AI Response:", aiResponse);
                    break; // Exit loop if successful
                } catch (error) {
                    if (error.status === 429) { // Rate limit error
                        console.warn(`Quota exceeded. Retrying in ${delay / 1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 2; // Increase wait time (5s → 10s)
                    } else {
                        throw error;
                    }
                }
            }

            // Fallback Response if API Calls Fail
            if (!aiResponse) {
                aiResponse = "I'm currently unavailable. Please try again later!";
            }


            // Send the final response
            return res.json({ reply: aiResponse });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
        }
    }








    // chatRes: async (req, res) => {
    //     try {
    //         const { message } = req.body;
    //         let userMessage = message;

    //         // Custom Response for "Hi"
    //         if (userMessage.toLowerCase() === "hi") {
    //             userMessage = "I'm your communication trainer. Are you ready? And say hi,.";
    //         }

    //         if (userMessage.toLowerCase() === "hello") {
    //             userMessage = "I'm your communication trainer. Are you ready? And say hello,.";
    //         }

    //         // Initialize Gemini Model
    //         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    //         // Generate AI Response
    //         const result = await model.generateContent([userMessage]);

    //         // Extract Response Text
    //         const response = result?.response?.text() || "No response received.";
    //         console.log(response);

    //         res.json({ reply: response });

    //     } catch (error) {
    //         console.error("Error:", error);
    //         res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
    //     }
    // }

};

export default chatController;
