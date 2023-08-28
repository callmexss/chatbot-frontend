'use client'

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

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
      // First, add the user's message to the UI
      setMessages([...messages, { content: input, type: 'user' }]);

      // Clear the input field
      setInput('');

      // Then, send the message to the server and wait for the bot's reply
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch('http://localhost:8000/chat/openai/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input }),
          signal,
        });

        // Create a variable to hold the bot's reply
        let botReply = '';

        // Read the response stream incrementally
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Convert ArrayBuffer to string and add it to botReply
          const chunk = new TextDecoder().decode(value);
          botReply += chunk;
          console.log(botReply);

          // Update the UI with the current state of botReply
          setMessages([...messages, { content: input, type: 'user' }, { content: botReply, type: 'bot' }]);
        }

        // Once done, you might want to finalize the bot's reply in the state
        // setMessages([...messages, { content: botReply, type: 'bot' }]);
      } catch (error) {
        console.error('Fetch failed:', error);
      }

  };

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div className="w-full max-w-2xl flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={message.type === 'user' ? 'bg-blue-300 text-white p-2 rounded' : 'bg-gray-300 p-2 rounded'}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t w-full max-w-2xl p-4">
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
  );
}
