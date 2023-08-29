export const ChatBox = ({ messages }) => (
  <div className="w-full flex-1 overflow-y-auto p-4">
    {messages.map((message, index) => (
      <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
        <span className={message.type === 'user' ? 'bg-blue-300 text-white p-2 rounded' : 'bg-gray-300 p-2 rounded'}>
          {message.content}
        </span>
      </div>
    ))}
  </div>
);

export default ChatBox;