import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userPrompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    // Create a new instance right before the call as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert history to the format expected by the SDK if needed, 
    // but for simplicity and strict adherence to provided snippets:
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'HomiePro Assistant', a professional interior designer and shopping expert for an upscale furniture, lamp, and bedding store called HomiePro. 
        Your goal is to help users choose products and give design advice. 
        Be professional, elegant, and helpful. 
        Refer to HomiePro's categories: Lamps, Bedsheets, and Furniture.
        Keep responses concise and helpful.`,
      },
    });

    return response.text || "I'm here to help! Could you tell me more about what you're looking for?";
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a bit of trouble connecting to my design library. How else can I help you today?";
  }
};