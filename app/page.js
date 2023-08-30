'use client'

import React, { useState, useEffect } from 'react';
import ToolBar from './Components/ToolBar';
import ChatBox from './Components/ChatBox';
import InputBox  from './Components/InputBox';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        setInput(input + '\n');
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const sendMessage = async () => {
    setMessages([...messages, { content: input, type: 'user' }]);
    setInput('');

    const response = await fetch('http://localhost:8000/chat/openai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: input,
        system_prompt: systemPrompt,
        conversation_id: currentConversationId
      }),
    });

    let botReply = '';
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder().decode(value);
      botReply += chunk;
      setMessages([...messages, { content: input, type: 'user' }, { content: botReply, type: 'bot' }]);
    }
  };

  useEffect(() => {
    if (currentConversationId) {
      // Fetch messages for the current conversation
      fetch(`http://localhost:8000/chat/conversations/${currentConversationId}/messages/`)
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }
  }, [currentConversationId]);

  return (
    <div className="flex h-screen">
      <ToolBar
        systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} 
        currentConversationId={currentConversationId} setCurrentConversationId={setCurrentConversationId}
      />
      <div className="flex flex-col w-4/6 h-full items-center justify-between">
        <ChatBox messages={messages} />
        <InputBox input={input} setInput={setInput} sendMessage={sendMessage} handleKeyDown={handleKeyDown} />
      </div>
      <div className="w-1/6"></div>
    </div>
  );

}
