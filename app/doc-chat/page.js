"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ToolBar from "../Components/ToolBar";
import ChatBox from "../Components/ChatBox";
import InputBox from "../Components/InputBox";
import DocumentList from "../Components/DocumentList";
import ConversationService from "../services/ConversationService";

export default function DocChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const selectedDocumentIds = useSelector((state) => state.document.selectedDocumentIds);


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

    const response = await ConversationService.sendMessageWithStream(
      input,
      systemPrompt,
      currentConversationId,
      selectedDocumentIds,
    );

    let botReply = "";
    let conversationId = 0;
    const reader = response.body.getReader();
    const { done, value } = await reader.read();
    if (!done) {
      const initialChunk = new TextDecoder().decode(value);
      const [conversationIdNew, remaining] = initialChunk.split("|||", 2);
      conversationId = conversationIdNew;
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

    if (conversationId !== currentConversationId) {
        ConversationService.fetchConversations().then((newConversations) => {
          setCurrentConversationId(conversationId);
          setConversations(newConversations);
        });
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
    <div className="custom-scrollbar">
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
        <div className="flex flex-col h-full w-1/6">
          <DocumentList />
        </div>
      </div>
    </div>
  ); 

}
