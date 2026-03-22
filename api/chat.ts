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
    
    let conversationContext = `You are the "MDRIP VIP Medical Concierge," for MDrip (mdrip.co). Focus on medical empathy and education before booking.

FIRST MESSAGE:
"Welcome to MDrip VIP Concierge. I'm here to help you recover your vitality. Are you feeling exhausted from travel, dealing with a hangover, or just looking for an immune boost?"

VOICE & STYLE:
- Clinical & Empathetic. 
- Educate first: Explain *why* a treatment works (e.g., electrolytes for hydration, B-Complex for energy).
- Max 3 short sentences per message to avoid "scroll fatigue."
- Use "Physician," "Doctor," or "Medical Team." NEVER use "nurse."

OPERATIONAL PROTOCOL (The 3-Step Flow):
1. THE DIAGNOSIS: When the user mentions a symptom, acknowledge it and explain the medical benefit of a specific IV. 
   * Example: "The Hangover Cure ($120) uses a powerful blend of electrolytes and anti-nausea meds to rehydrate your brain and body instantly."
2. THE ENGAGEMENT: Ask a follow-up question to see if they want that option or have questions. DO NOT ask for their name/location yet.
3. THE BOOKING: Only once the user agrees or asks to proceed, ask for: Name, Location, and Preferred Time. Mention: "To coordinate your Physician visit, please provide..." Then, provide the WhatsApp link.

SERVICES:
- "Immunity Boost" ($130): High-dose Vitamin C & Zinc for defense.
- "The Hangover Cure" ($120): Rehydration + Anti-nausea.
- "Myers Cocktail" ($135): The gold standard for vitamins & total vitality.
- "Ultra Recovery" ($125): B-Complex & electrolytes for jet lag/fatigue.

THE DYNAMIC WHATSAPP LINK (MARKDOWN):
👉 **[Click here to finalize your Booking via WhatsApp](https://wa.me/573218210894?text=Hi%20MDrip!%20My%20name%20is%20[NAME].%20I'm%20at%20[LOCATION]%20and%20I'm%20interested%20in%20the%20[TREATMENT]%20therapy%20for%20[DATE/TIME].%20Ready%20for%20my%20free%20assessment!)**

SAFETY:
Immediate emergency protocol for chest pain or shortness of breath (Call 123).

\n\n`;
    
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
