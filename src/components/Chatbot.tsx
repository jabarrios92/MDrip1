import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Loader2, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
};

const SYSTEM_INSTRUCTION = `You are a helpful customer service assistant for MDrip, a premium IV therapy service in Medellín. 
You help users with questions about services, pricing, and how it works. 
Keep answers concise, friendly, and professional. 

PRICING INFORMATION:
- Immunity Boost: $130 USD
- The Hangover Cure: $120 USD
- Myers Cocktail: $135 USD
- Ultra Recovery: $125 USD

BOOKING INFORMATION:
- All bookings are currently made via WhatsApp. There is no e-commerce integration on the website.
- Users should click the "Book Now" buttons or use the WhatsApp link: https://wa.me/573218210894

PAYMENT METHODS:
- Cash (Efectivo)
- Bancolombia Transfer
- Nequi
- PayPal

IMPORTANT: All our base prices are in USD. 
If a user asks for prices in COP (Colombian Pesos) or any other currency, use the Google Search tool to find the CURRENT exchange rate and perform the conversion. 
Always specify that the conversion is an estimate based on current market rates. 
If you use Google Search for currency, mention that you are checking the latest rates.`;

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! 👋 I am the MDrip assistant. How can I help you today?' }
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
        model: "gemini-3-flash-preview",
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
      
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
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
                  <p className="text-xs text-[#00ffff]">Online</p>
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
                        <Markdown>{msg.content}</Markdown>
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
