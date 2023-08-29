export const ToolBar = ({ systemPrompt, setSystemPrompt }) => (
  <div className="flex flex-col w-1/6 p-4 border-r">
    <h2>Tool Bar</h2>
    <div className="mt-4">
      <label htmlFor="system-prompt">System Prompt:</label>
      <input 
        id="system-prompt" 
        type="text" 
        className="w-full p-2 border rounded"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
    </div>
  </div>
);

export default ToolBar;