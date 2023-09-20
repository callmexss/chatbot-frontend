import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    <div className={`flex flex-col p-4 border-r transition-all duration-300 ${isExpanded ? 'w-full md:w-1/6' : 'w-16 md:w-16'}`}>
      <button onClick={toggleExpand} className="self-end mb-2">
        <FontAwesomeIcon icon={isExpanded ? faTimes : faBars} />
      </button>
      <div className={`${isExpanded ? 'visible' : 'invisible'} ${isExpanded ? 'overflow-y-auto h-[calc(100vh - 200px)] custom-scrollbar' : ''}`}>
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
    </div>
  );
};

export default ToolBar;
