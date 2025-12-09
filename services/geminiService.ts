import { GoogleGenAI } from "@google/genai";
import { OFM_CONTEXT } from "../types";

// Initialize the API client
// Note: In a real environment, you should handle key missing gracefully or via UI prompt as per instructions.
// For this app, we assume process.env.API_KEY is available or injected.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    if (!apiKey) {
      return "Error: API_KEY is missing in the environment.";
    }

    const model = 'gemini-2.5-flash';
    
    // We construct the chat with the system instruction
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: `You are an expert theoretical physicist specializing in the Ouellet Flip Model (OFM). 
        Use the following core text as your absolute source of truth for the theory:
        ---
        ${OFM_CONTEXT}
        ---
        Explain concepts clearly. If asked about math, use plain text or simple notation. 
        When discussing the "Flip", emphasize the topological orientation change.
        Be concise but profound.`,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No response received.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error analyzing the topological flip. Please try again.";
  }
};