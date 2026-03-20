import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Hello! I am the MDrip assistant. How can I help you with our IV Therapy services in Medellín today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: {
          systemInstruction: `You are a helpful customer service assistant for MDrip, a premium IV Therapy service based in Medellín, Colombia. 
          MDrip provides physician-led medical care in the comfort of the customer's accommodation (Airbnb, hotel, or home).
          Services include:
          - Immunity Boost ($130): Vitamin C, Electrolytes, Antioxidants.
          - The Hangover Cure ($120): Ringer Lactate, B-Complex, Thiamine.
          - Myers Cocktail ($135): Calcium Gluconate, B-Complex, Vitamin C.
          - Ultra Recovery ($125): Thiamine, Vitamin B2, B6, B12, Electrolytes, Ringer Lactate.
          
          Contact info: WhatsApp +57 321 8210894.
          Be concise, friendly, and professional. Always encourage users to book via WhatsApp.`,
        }
      });

      // Send previous history if any (this is a simplified approach, ideally we'd pass history to create)
      // Since we can't easily pass history to ai.chats.create in the new SDK without a specific format, 
      // we'll just send the latest message with some context.
      
      const contextPrompt = `Previous conversation:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nUser: ${userMessage.content}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contextPrompt,
        config: {
          systemInstruction: `You are a helpful customer service assistant for MDrip, a premium IV Therapy service based in Medellín, Colombia. 
          MDrip provides physician-led medical care in the comfort of the customer's accommodation (Airbnb, hotel, or home).
          Services include:
          - Immunity Boost ($130): Vitamin C, Electrolytes, Antioxidants.
          - The Hangover Cure ($120): Ringer Lactate, B-Complex, Thiamine.
          - Myers Cocktail ($135): Calcium Gluconate, B-Complex, Vitamin C.
          - Ultra Recovery ($125): Thiamine, Vitamin B2, B6, B12, Electrolytes, Ringer Lactate.
          
          Contact info: WhatsApp +57 321 8210894.
          Be concise, friendly, and professional. Always encourage users to book via WhatsApp.`,
        }
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || 'I am sorry, I could not process that request.'
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'Sorry, I encountered an error. Please contact us directly on WhatsApp at +57 321 8210894.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] h-[60vh] sm:h-[500px] max-h-[600px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#008080]/20 flex items-center justify-center text-[#00ffff]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">MDrip Assistant</h3>
                  <p className="text-xs text-[#00ffff]">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#008080] text-white rounded-tr-sm'
                        : 'bg-white/10 text-white/90 rounded-tl-sm'
                    }`}
                  >
                    <div className="text-sm prose prose-invert max-w-none">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/90 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our IV therapies..."
                  className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 rounded-full bg-[#008080] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00ffff] hover:text-black transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black rounded-full shadow-lg shadow-teal-500/20 flex items-center justify-center z-50 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

export default Chatbot;
