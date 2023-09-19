"use client";

import React, { useState, useEffect } from "react";
import ToolBar from "./Components/ToolBar";
import ChatBox from "./Components/ChatBox";
import InputBox from "./Components/InputBox";

export default function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/chat/conversations/`);
    const data = await response.json();
    setConversations(data);
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
    setMessages([...messages, { content: input, message_type: "user" }]);
    setInput("");

    const response = await fetch(`${API_BASE_URL}/api/v1/chat/openai/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: input,
        system_prompt: systemPrompt,
        conversation_id: currentConversationId,
      }),
    });

    let botReply = "";
    const reader = response.body.getReader();
    const { done, value } = await reader.read();
    if (!done) {
      const initialChunk = new TextDecoder().decode(value);
      const [conversationId, remaining] = initialChunk.split("|||", 2);
      fetchConversations().then(() => {
        console.log("set conversation id: " + conversationId);
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
      setMessages([
        ...messages,
        { content: input, message_type: "user" },
        { content: botReply, message_type: "bot" },
      ]);
    }
  };

  useEffect(() => {
    if (currentConversationId) {
      // Fetch messages for the current conversation
      fetch(
        `${API_BASE_URL}/api/v1/chat/conversations/${currentConversationId}/messages/`
      )
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }
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
