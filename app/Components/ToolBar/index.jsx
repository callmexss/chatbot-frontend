import SystemPromptManager from './SystemPromptManager';
import ConversationManager from './ConversationManager';

export const ToolBar = ({
  setSystemPrompt,
  setCurrentConversationId,
  setMessages,
  handleConversationSelected
}) => {
  return (
    <div className="flex flex-col w-1/6 p-4 border-r">
      <h2>Tool Bar</h2>
      <SystemPromptManager setSystemPrompt={setSystemPrompt} />
      <ConversationManager 
        setCurrentConversationId={setCurrentConversationId} 
        setMessages={setMessages} 
        handleConversationSelected={handleConversationSelected}
      />
    </div>
  );

};

export default ToolBar;