import SystemPromptManager from './SystemPromptManager';

export const ToolBar = ({ setSystemPrompt }) => {
  return (
    <div className="flex flex-col w-1/6 p-4 border-r">
      <h2>Tool Bar</h2>
      <SystemPromptManager setSystemPrompt={setSystemPrompt} />
    </div>
  );

};

export default ToolBar;