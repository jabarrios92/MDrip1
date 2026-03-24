import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Loader2, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
};

const SYSTEM_INSTRUCTION = `You are the "MDRIP VIP Medical Concierge" for MDrip (mdrip.co). If you need to introduce yourself, say "I am part of the MDrip Medical Team" instead of VIP Medical Concierge.

Focus on medical empathy and education before booking.

FIRST MESSAGE:
"Welcome to MDrip. I'm here to help you recover your vitality. Are you looking for a recovery from travel fatigue/hangover? an immune boost? or maybe just a private medical consultation? Our specialists are ready to assist you."

PERSONALITY TRAITS:
Incorporate messages like: "Hello! I am part of the MDrip Medical Team. We are here to help you feel your best with our elite IV therapies and physician-led care. How are you feeling today? Are you experiencing any specific symptoms like fatigue, dehydration, or looking for an immune system boost?"

VOICE & STYLE:
- Clinical & Empathetic.
- Educate first: Explain why a treatment works (e.g., electrolytes for hydration, B-Complex for energy).
- Max 3 short sentences per message to avoid "scroll fatigue."

OPERATIONAL PROTOCOL (The 3-Step Flow):
1. THE DIAGNOSIS: When the user mentions a symptom, acknowledge it and explain the medical benefit of a specific IV.
   Example: "The Hangover Cure ($120) uses a powerful blend of Ringer Lactate, Thiamine, and anti-nausea meds to rehydrate your brain and body in a short period of time."
2. THE ENGAGEMENT: Ask a follow-up question to see if they want that option or have questions. DO NOT ask for their name/location yet.
3. THE BOOKING: Only once the user agrees or asks to proceed, ask for: Name, Location, and Preferred Time. Then, provide the WhatsApp link.

CLOSURE:
Explain that a FREE medical pre-assessment will be given. Provide the WhatsApp link.

SERVICES:
- "Immunity Boost" ($130): High-dose Vitamin C and Electrolytes to improve your immune system.
- "The Hangover Cure" ($120): Ringer Lactate, Thiamine, and Anti-Nausea to rehydrate and restore your balance.
- "Myers Cocktail" ($135): The gold standard for vitamins & total vitality (Calcium Gluconate, B-Complex and vitamin C).
- "Ultra Recovery" ($125): Thiamine, Vitamin B2, B6, B12, Electrolytes in a Ringer Lactate solution for jet lag/fatigue/muscle recovery.

IMPORTANT: We do NOT use Magnesium, Zinc, or Iron. Stick strictly to the ingredients listed above.

THE DYNAMIC WHATSAPP LINK (MARKDOWN):
You MUST migrate the collected info (Name, Location, Treatment, Time) into the WhatsApp link's text parameter.
If a piece of information is missing, do NOT include that part in the message to avoid a broken/generic look.
👉 **[Click here to complete your Booking](https://wa.me/573218210894?text=Hi%20MDrip!%20[INFO_HERE]Ready%20for%20my%20free%20assessment!)**
(Construct the text parameter dynamically based on available info).

SAFETY:
Immediate emergency protocol for chest pain, loss of consciousness or shortness of breath (Call 123).

KEY INFO:
- Payments: Cash (USD/COP), Bancolombia, Nequi, Bre-B, PayPal.
- Instagram: @mdrip.med
- Language: Respond in the language the user speaks.
- Treatment Effects: Many clients report feeling an immediate boost in energy and hydration. Depending on the drip, full effects are typically felt within a few hours and can last for several days.
- Team: We are PROFESSIONAL PHYSICIANS (physicians). We are NOT nurses. Do not mention "nurses" in a way that implies they lead the care. While a nurse may assist with the procedure, everything is guided and structured by a professional physician in a complete, private medical care context.`;

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to MDrip. I'm here to help you recover your vitality. Are you looking for a recovery from travel fatigue/hangover? an immune boost? or maybe just a private medical consultation? Our specialists are ready to assist you." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const ai = new GoogleGenAI({ apiKey });
      
      const chatHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-flash-latest",
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });

      let fullResponse = "";
      let sources: { uri: string; title: string }[] = [];
      
      // Add a placeholder for the assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

      for await (const chunk of responseStream) {
        const text = chunk.text || "";
        fullResponse += text;
        
        // Extract grounding sources if available in the chunk
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          groundingChunks.forEach((c: any) => {
            if (c.web && !sources.find(s => s.uri === c.web.uri)) {
              sources.push({ uri: c.web.uri, title: c.web.title });
            }
          });
        }

        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = fullResponse;
            lastMessage.sources = sources.length > 0 ? sources : undefined;
          }
          return newMessages;
        });
      }
      
    } catch (error: any) {
      console.error("Chat Error:", error);
      let errorMessage = 'Sorry, I am having trouble connecting right now. Please try again later.';
      
      if (error.message) {
        if (error.message.includes("API Key not found")) {
          errorMessage = "The Chatbot API Key is not configured. If you are on Vercel, please add GEMINI_API_KEY to your Environment Variables in the project settings.";
        } else if (error.message.includes("403") || error.message.includes("permission")) {
          errorMessage = "Access denied to the AI service. Please check if your API Key is valid and has the correct permissions.";
        } else if (error.message.includes("404") || error.message.includes("not found")) {
          errorMessage = "Model not found. Please check if the model name is correct.";
        } else if (error.message.includes("quota") || error.message.includes("429")) {
          errorMessage = "Quota exceeded (429). You have reached the usage limit of your Gemini API key. Please wait a minute or check your limits at https://aistudio.google.com/app/apikey";
        } else {
          // Show the actual error message to help the user debug
          errorMessage = `Connection Error: ${error.message}`;
        }
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black rounded-full shadow-[0_0_20px_rgba(0,128,128,0.4)] flex items-center justify-center z-50 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00ffff]/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#00ffff]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">MDrip Assistant</h3>
                  <p className="text-xs text-[#00ffff]">Online (v2.1)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#00ffff]" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#008080] text-white rounded-tr-sm' 
                        : 'bg-white/10 text-white/90 rounded-tl-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="markdown-body text-sm prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50">
                        <Markdown
                          components={{
                            a: ({ node, ...props }) => (
                              <motion.a
                                href={props.href}
                                title={props.title}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center justify-center gap-2 bg-[#054d44] hover:bg-[#075E54] text-white px-4 py-2 rounded-full font-bold no-underline my-2 transition-all duration-300 shadow-lg relative overflow-hidden group"
                              >
                                <WhatsappIcon className="w-4 h-4" />
                                <span className="text-xs">{props.children}</span>
                                {/* Lighting effect animation */}
                                <motion.div 
                                  animate={{ 
                                    left: ['-100%', '200%'],
                                  }}
                                  transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    ease: "linear",
                                    repeatDelay: 2
                                  }}
                                  className="absolute top-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg] pointer-events-none"
                                />
                              </motion.a>
                            ),
                          }}
                        >
                          {msg.content}
                        </Markdown>
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {msg.sources.map((source, idx) => (
                                <a 
                                  key={idx}
                                  href={source.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-cyan-400"
                                >
                                  <ExternalLink className="w-2 h-2" />
                                  {source.title || 'Source'}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#00ffff]" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#00ffff] animate-spin" />
                    <span className="text-xs text-white/50">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-[#0a0a0a] border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-[#008080] disabled:hover:text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
