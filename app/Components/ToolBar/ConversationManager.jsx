import React, { useState, useEffect } from 'react';

const ConversationManager = ({ 
    setCurrentConversationId,
    setMessages,
    handleConversationSelected
}) => {
  const [conversations, setConversations] = useState([]);
  const [newConversationName, setNewConversationName] = useState('');
  const [localCurrentConversationId, setLocalCurrentConversationId] = useState(null);

  useEffect(() => {
    // Fetch existing conversations from the backend
    fetch('http://localhost:8000/chat/conversations/')
      .then((response) => response.json())
      .then((data) => setConversations(data));
  }, []);

  const createConversation = () => {
    fetch('http://localhost:8000/chat/conversations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newConversationName }),
    })
    .then((response) => response.json())
    .then((data) => {
      setConversations([...conversations, data]);
      setNewConversationName('');
    });
    handleConversationSelected();
  };

  const deleteConversation = (id) => {
      fetch(`http://localhost:8000/chat/conversations/${id}/`, {
        method: 'DELETE',
      })
      .then(() => {
        if (id === localCurrentConversationId) {
          setMessages([]);
          setCurrentConversationId(null);
          setLocalCurrentConversationId(null);
        }
        setConversations((prevConversations) => prevConversations.filter((conversation) => conversation.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the conversation:", error);
      });
  };

  const selectConversation = (id) => {
    setLocalCurrentConversationId(id);
    setCurrentConversationId(id);
    handleConversationSelected();
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg custom-scrollbar" style={{ maxHeight: 'calc(100vh - SOME_OFFSET)', overflowY: 'auto' }}>
      <h3 className="text-xl font-bold mb-2">Conversations</h3>
      <div className="mt-2 flex items-center space-x-1">
        <input
          type="text"
          placeholder="New Conv."
          value={newConversationName}
          onChange={(e) => setNewConversationName(e.target.value)}
          className="p-2 w-full border rounded text-sm"
        />
        <button onClick={createConversation} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs">
          Cr
        </button>
      </div>
      <ul className="space-y-1 flex-grow">
        {conversations.map((conversation) => (
          <li 
            key={conversation.id} 
            className={`p-2 rounded ${localCurrentConversationId === conversation.id ? 'bg-green-300' : 'bg-white'} shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{conversation.name}</span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => deleteConversation(conversation.id)} 
                  className="text-white bg-red-600 p-1 rounded hover:bg-red-700 text-xs"
                >
                  Del
                </button>
                <button
                  onClick={() => selectConversation(conversation.id)}
                  className={`text-white p-1 rounded ${localCurrentConversationId === conversation.id ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-800 text-xs`}
                >
                  Sel
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default ConversationManager;
