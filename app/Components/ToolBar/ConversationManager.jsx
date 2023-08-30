import React, { useState, useEffect } from 'react';

const ConversationManager = ({ setCurrentConversationId }) => {
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
  };

  const deleteConversation = (id) => {
    fetch(`http://localhost:8000/chat/conversations/${id}/`, {
      method: 'DELETE',
    })
    .then(() => {
      setConversations(conversations.filter((conversation) => conversation.id !== id));
    });
  };

  const selectConversation = (id) => {
    setLocalCurrentConversationId(id);
    setCurrentConversationId(id);
  };

  return (
    <div>
      <h3>Conversations</h3>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            {conversation.name}
            <button onClick={() => deleteConversation(conversation.id)}>Delete</button>
            <button
              className={`text-green-500 hover:text-green-700 ${localCurrentConversationId === conversation.id ? 'text-green-900' : ''}`}
              onClick={() => selectConversation(conversation.id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        placeholder="New Conversation Name"
        value={newConversationName}
        onChange={(e) => setNewConversationName(e.target.value)}
      />
      <button onClick={createConversation}>Create</button>
    </div>
  );
};

export default ConversationManager;
