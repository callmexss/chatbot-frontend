import React, { useState } from 'react';
import SystemPromptManager from './SystemPromptManager';
import ConversationManager from './ConversationManager';

export const ToolBar = ({
  setSystemPrompt,
  currentConversationId,
  setCurrentConversationId,
  setMessages,
  conversations,
  setConversations,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col p-4 border-r transition-all duration-300 ${isExpanded ? 'w-full md:w-1/6' : 'w-1/12 md:w-1/12'}`}>
      <h2>Tool Bar</h2>
      <button onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && (
        <>
          <SystemPromptManager setSystemPrompt={setSystemPrompt} />
          <ConversationManager 
            setCurrentConversationId={setCurrentConversationId} 
            currentConversationId={currentConversationId}
            setMessages={setMessages} 
            conversations={conversations}
            setConversations={setConversations}
          />
        </>
      )}
    </div>
  );
};

export default ToolBar;
