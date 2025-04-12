// components/ChatbotPlaceholder.jsx
"use client";
import { useState } from 'react';

const ChatbotPlaceholder = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your travel assistant. How can I help you today?", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = { id: messages.length + 1, text: newMessage, isBot: false };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        id: messages.length + 2, 
        text: "Thanks for your message! In a full implementation, I would provide helpful travel information based on your query.", 
        isBot: true 
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-tertiary">Travel Assistant</h2>
      
      <div className="flex-grow overflow-y-auto mb-4 space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`p-3 rounded-lg ${
              message.isBot 
                ? 'bg-tertiary text-white self-start' 
                : 'bg-primary text-secondary self-end'
            } ${
              message.isBot ? 'rounded-tl-none' : 'rounded-tr-none'
            } max-w-3/4 inline-block`}
          >
            {message.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask about your trip..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-tertiary"
        />
        <button 
          type="submit"
          className="bg-tertiary text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatbotPlaceholder;