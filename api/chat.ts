import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === "undefined" || apiKey === "null" || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(500).json({ error: "API key not configured properly. Please set a valid GEMINI_API_KEY." });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    let conversationContext = "You are a helpful customer service assistant for MDrip, a premium IV therapy service in Medellín. You help users with questions about services, pricing, and how it works. Keep answers concise, friendly, and professional. IMPORTANT: All prices are in USD. If asked about prices, always specify they are in USD.\n\n";
    
    if (history && history.length > 0) {
      conversationContext += "Previous conversation:\n";
      history.forEach((msg: any) => {
        conversationContext += `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContext += "\n";
    }
    
    conversationContext += `Customer: ${message}\nAssistant:`;
    
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: conversationContext,
    });
    
    res.status(200).json({ response: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    if (error.message && error.message.includes("API key not valid")) {
      return res.status(401).json({ error: "Invalid API Key. Please check your GEMINI_API_KEY in the Secrets panel." });
    }
    res.status(500).json({ error: "Failed to generate response" });
  }
}
