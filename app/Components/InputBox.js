export const InputBox = ({ input, setInput, sendMessage, handleKeyDown }) => (
  <div className="border-t w-full p-4">
    <textarea
      className="w-full p-2 rounded border"
      rows="3"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <button 
      onClick={sendMessage} 
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
    >
      Send
    </button>
  </div>
);

export default InputBox;
