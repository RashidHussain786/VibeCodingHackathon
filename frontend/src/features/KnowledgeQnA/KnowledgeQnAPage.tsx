import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { askQuestion } from "../../services/api";

interface Message {
  text: string;
  isUser: boolean;
}

const KnowledgeQnAPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = { text, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      const response = await askQuestion(text);
      const aiResponse: Message = { text: response.answer, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error asking question:", error);
      const errorMessage: Message = {
        text: "Sorry, I could not get an answer. Please try again.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        data-testid="chat-messages"
        className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4 space-y-2"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default KnowledgeQnAPage;
