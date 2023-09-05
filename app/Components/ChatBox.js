import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const textAreaRef = useRef(null);
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

export const ChatBox = ({ messages }) => (
  <div className="w-full flex-1 overflow-y-auto p-4 custom-scrollbar">
    {messages.map((message, index) => (
      <div key={index} className={`mb-4 ${message.message_type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
        <div className={message.message_type === 'user' ? 'bg-blue-300 text-white p-2 rounded-lg shadow-lg inline-block' : 'bg-gray-300 p-2 rounded-lg shadow-lg inline-block'}>
          {message.message_type === 'bot' ? (
            <ReactMarkdown components={{ code: CodeBlock }}>
              {message.content}
            </ReactMarkdown>
          ) : (
            <pre className="whitespace-pre-wrap">
              {message.content}
            </pre>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ChatBox;