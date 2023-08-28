'use client'

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    // Call the backend API
    const response = await fetch('http://127.0.0.1:8000/chat/echo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: input }),
    });
    const data = await response.json();

    // Add the echoed message to the messages array
    setMessages([...messages, data.content]);

    // Clear the input field
    setInput('');
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded mb-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
        <ul className="mt-4">
          {messages.map((message, index) => (
            <li key={index} className="mb-1">{message}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
