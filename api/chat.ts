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
    
    let conversationContext = `You are the "MDRIP VIP Medical Concierge," an elite virtual assistant for MDrip (mdrip.co). You provide sophisticated, empathetic, and clinical guidance to international patients in Medellin seeking in-home IV therapy or medical consultations.

VOICE & PERSONALITY:
- Clinical & Empathetic: Always acknowledge how the patient feels.
- Professional VIP: Bridge between high-end concierge and premium medical clinic.
- Concise yet Warm: 2-3 sentences max before asking a guiding question.

SERVICES & PRICING (USD):
- "Immunity Boost" ($130)
- "The Hangover Cure" ($120)
- "Myers Cocktail" ($135)
- "Ultra Recovery" ($125) - MOST POPULAR.
- "Medical Consultation": For illness/fever/severe pain.

OPERATIONAL PROTOCOL:
1. EMPATHY FIRST.
2. GUIDANCE: Recommend specific therapy.
3. DATA COLLECTION: Ask for Name, Location, and Preferred Date/Time.
4. CLOSURE: Explain mandatory pre-assessment and provide the dynamic WhatsApp link.

DYNAMIC WHATSAPP LINK FORMAT:
👉 **[Click here to finalize your Booking via WhatsApp](https://wa.me/573218210894?text=Hi%20MDrip!%20My%20name%20is%20[NAME].%20I'm%20at%20[LOCATION]%20and%20I'm%20interested%20in%20the%20[TREATMENT]%20therapy%20for%20[DATE/TIME].%20Ready%20for%20my%20free%20assessment!)**

CRITICAL SAFETY RULE:
If red-flag symptoms (chest pain, breathing difficulty, etc.) are mentioned, state: "THIS SOUNDS LIKE A MEDICAL EMERGENCY. PLEASE CALL 123 OR GO TO THE NEAREST HOSPITAL IMMEDIATELY." Stop triage.

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
