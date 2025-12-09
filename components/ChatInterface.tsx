import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Greetings. I am an expert on the Ouellet Flip Model (OFM). Ask me about the topology of singularities, the function F(r), or the nature of the Void.',
      timestamp: new Date()
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

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Get Response
    const responseText = await sendMessageToGemini(userText, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden m-4">
      {/* Chat Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
        <h2 className="font-mono font-bold text-slate-200">OFM Physics Assistant</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-sm' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
              }`}
            >
              {/* Simple formatting for code blocks in response */}
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-1 min-h-[1.2em]">{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 px-5 py-3 rounded-2xl rounded-tl-sm border border-slate-700 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="bg-slate-950 p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about entropy, orientation, or the flip..."
            className="flex-1 bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
