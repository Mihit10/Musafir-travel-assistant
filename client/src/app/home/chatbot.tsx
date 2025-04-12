"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

// 🔐 Reminder: Move your API key to a secure backend or environment variable for production!
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

// 🔹 Types
type CityName = "Goa" | "Kerala" | "Himachal" | "Uttarakhand" | "Rajasthan" | "default";

interface ColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

interface ChatbotProps {
  ContextJson: Record<string, any>;
  city?: CityName;
}

// 🔹 City Themes
const colors: Record<CityName, ColorScheme> = {
  Goa: {
    primary: "#E0F7FA",
    secondary: "#00796B",
    tertiary: "#FF8F00",
  },
  Kerala: {
    primary: "#E8F5E9",
    secondary: "#33691E",
    tertiary: "#01579B",
  },
  Himachal: {
    primary: "#E3F2FD",
    secondary: "#5D4037",
    tertiary: "#1A237E",
  },
  Uttarakhand: {
    primary: "#F3E5F5",
    secondary: "#33691E",
    tertiary: "#01579B",
  },
  Rajasthan: {
    primary: "#FFF8E1",
    secondary: "#BF360C",
    tertiary: "#880E4F",
  },
  default: {
    primary: "#FFF0D1",
    secondary: "#664343",
    tertiary: "#4A6FA5",
  },
};

const Chatbot: React.FC<ChatbotProps> = ({ ContextJson, city = "default" }) => {
  const theme = colors[city] || colors.default;

  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string; typing: boolean }[]
  >([
    {
      sender: "bot",
      text: "Hello! I'm your Travel Assistant. How can I help you today?",
      typing: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const botProfile = "https://cdn-icons-png.flaticon.com/128/9683/9683128.png";

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input, typing: false }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thinking...", typing: true },
      ]);
    }, 300);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

      // 🌱 Sustainable tourism hint in prompt
      const context = `
You are a helpful travel assistant AI. You help users with questions related to their itinerary, local attractions, safety tips, transportation, and more. You also **gently promote sustainable tourism and eco-conscious travel practices** (e.g., support local businesses, avoid plastic, travel off-season, respect local culture and wildlife).

Here is the user's travel itinerary in JSON:
\`\`\`json
${JSON.stringify(ContextJson, null, 2)}
\`\`\`

Try to keep your respnse short and simple
You do not need to include the JSON in your response. include only the relevant information.
Use Markdown formatting:
- **bold** for emphasis
- \`code\` for commands
- bullet lists when listing steps
`;

      const result = await model.generateContent([context, input]);
      const response = await result.response.text();

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, text: response, typing: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, text: "Sorry, I couldn't process your request.", typing: false }
            : msg
        )
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6 shadow-md" style={{ backgroundColor: theme.primary }}>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: theme.secondary }}>
          Travel Assistant Chatbot
        </h2>
        <p className="mb-4" style={{ color: theme.tertiary }}>
          Ask anything about your trip or destination. I'm also here to guide you on eco-friendly choices 🌱.
        </p>

        <div className="h-80 overflow-y-auto p-4 border rounded-md" style={{ backgroundColor: theme.primary }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <img src={botProfile} alt="Bot" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div
                className="px-4 py-2 max-w-[75%] rounded-lg"
                style={{
                  backgroundColor: msg.sender === "user" ? theme.secondary : "#f0f0f0",
                  color: msg.sender === "user" ? "#fff" : "#333",
                }}
              >
                {msg.typing ? (
                  <Skeleton count={1} width={100} />
                ) : msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white placeholder-gray-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="px-4 py-2 rounded-r-md transition"
            style={{ backgroundColor: theme.tertiary, color: "#fff" }}
            onClick={sendMessage}
            disabled={loading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
