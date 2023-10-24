import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');

  const handleCopyClick = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
  };

  return !inline && match ? (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleCopyClick} 
        className='copy-button'
      >
        Copy
      </button>
      <SyntaxHighlighter language={match[1]} PreTag="div" style={docco} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const ChatBox = ({ messages }) => {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEntireMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.message_type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
          <div className={`relative ${message.message_type === 'user' ? 'bg-blue-300 text-white p-2 rounded-lg shadow-lg inline-block' : 'chatbot bg-gray-300 px-2 py-4 rounded-lg shadow-lg inline-block'}`}>
            {message.message_type === 'bot' && (
              <button 
                onClick={() => handleCopyEntireMessage(message.content)} 
                className='absolute text-sm 2lg:text-base copy-button'
              >
                Copy
              </button>
            )}
            <ReactMarkdown components={{ code: CodeBlock }} remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBox;