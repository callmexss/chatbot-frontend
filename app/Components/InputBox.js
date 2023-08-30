export const InputBox = ({ input, setInput, sendMessage, handleKeyDown, disabled }) => (
  <div className={`border-t w-full p-4 ${disabled ? 'opacity-50' : ''}`}>
    <textarea
      className="w-full p-2 rounded border"
      rows="3"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />
    <button 
      onClick={sendMessage} 
      className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${disabled ? 'cursor-not-allowed' : ''}`} 
      disabled={disabled}
    >
      Send
    </button>
  </div>
);

export default InputBox;
