'use client'

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState('');

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
        system_prompt: systemPrompt 
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

return (
  <div className="flex h-screen">
    <div className="flex flex-col w-1/6 p-4 border-r">
      <h2>Tool Bar</h2>
      <div className="mt-4">
        <label htmlFor="system-prompt">System Prompt:</label>
        <input 
          id="system-prompt" 
          type="text" 
          className="w-full p-2 border rounded"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
    </div>
    <div className="flex flex-col w-4/6 h-full items-center justify-between">
      <div className="w-full flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={message.type === 'user' ? 'bg-blue-300 text-white p-2 rounded' : 'bg-gray-300 p-2 rounded'}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t w-full p-4">
        <textarea
          className="w-full p-2 rounded border"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Send
        </button>
      </div>
    </div>
    <div className="w-1/6">
    </div>
  </div>
);

}
