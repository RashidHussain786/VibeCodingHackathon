import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const messageClass = isUser
    ? "bg-indigo-500 text-white self-end rounded-br-none"
    : "bg-gray-300 text-gray-800 self-start rounded-bl-none";

  const justifyClass = isUser ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${justifyClass} mb-2`}>
      <div className={`max-w-xs p-3 rounded-lg shadow ${messageClass}`}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
