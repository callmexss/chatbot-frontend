"use client";

import React, { useState, useEffect } from "react";
import ToolBar from "./Components/ToolBar";
import ChatBox from "./Components/ChatBox";
import InputBox from "./Components/InputBox";
import ConversationService from "./services/ConversationService";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const data = await ConversationService.fetchConversations();
      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setInput(input + "\n");
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const sendMessage = async () => {
    setMessages((prevMessages) => [...prevMessages, { content: input, message_type: "user" }]);
    setInput("");

    try {
      const reader = await ConversationService.sendMessageWithStream(input, systemPrompt, currentConversationId);
      let botReply = "";
      
      const { done, value } = await reader.read();
      if (!done) {
        const initialChunk = new TextDecoder().decode(value);
        const [conversationId, remaining] = initialChunk.split("|||", 2);
        fetchConversations().then(() => {
          setCurrentConversationId(conversationId);
        });
        botReply += remaining;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = new TextDecoder().decode(value);
        botReply += chunk;
      }
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botReply, message_type: "bot" },
      ]);

    } catch (error) {
      console.error('An error occurred while sending the message:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (currentConversationId) {
          const messages = await ConversationService.fetchMessagesForConversation(currentConversationId);
          setMessages(messages);
        }
      } catch (error) {
        console.error('An error occurred while fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentConversationId]);

  return (
    <div className="flex h-screen">
      <ToolBar
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        currentConversationId={currentConversationId}
        setCurrentConversationId={setCurrentConversationId}
        setMessages={setMessages}
        conversations={conversations}
        setConversations={setConversations}
      />
      <div className="flex flex-col w-4/6 h-full items-center justify-between">
        <ChatBox messages={messages} />
        <InputBox
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-1/6"></div>
    </div>
  );
}
