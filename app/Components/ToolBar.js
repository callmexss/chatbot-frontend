import { useState, useEffect } from 'react';

export const ToolBar = ({ setSystemPrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState({ name: '', content: '' });
  const [editablePrompt, setEditablePrompt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromptId, setCurrentPromptId] = useState(null);


  useEffect(() => {
    // Fetch the system prompts from the backend
    fetch('http://localhost:8000/chat/system-prompts/')
      .then((response) => response.json())
      .then((data) => setPrompts(data));
  }, []);

  const addPrompt = () => {
    // Add the new prompt to the backend
    fetch('http://localhost:8000/chat/system-prompts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrompt),
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the UI
      setPrompts([...prompts, data]);
      setNewPrompt({ name: '', content: '' });
    });
  };

  const editPrompt = (prompt) => {
    setIsEditing(true);
    setEditablePrompt(prompt);
    setNewPrompt(prompt);
  };

  const deletePrompt = (id) => {
    fetch(`http://localhost:8000/chat/system-prompts/${id}/`, {
      method: 'DELETE',
    }).then(() => {
      setPrompts(prompts.filter((prompt) => prompt.id !== id));
    });
  };

  const usePrompt = (id, content) => {
    setSystemPrompt(content);
    setCurrentPromptId(id);
  };

  return (
    <div className="flex flex-col w-1/6 p-4 border-r">
      <h2>Tool Bar</h2>
      <div className="mt-2 max-h-48 overflow-y-auto">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="mb-2 flex justify-between items-center">
            <div className={`text-sm flex-grow ${currentPromptId === prompt.id ? 'text-blue-500' : ''}`}>
              <span title={prompt.content}>
                {prompt.name}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="text-green-500 hover:text-green-700" onClick={() => usePrompt(prompt.id, prompt.content)}>
                Use
              </button>
              <button className="text-blue-500 hover:text-blue-700" onClick={() => editPrompt(prompt)}>
                Edit
              </button>
              <button className="text-red-500 hover:text-red-700" onClick={() => deletePrompt(prompt.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="New Prompt Name" 
          className="w-full p-2 border rounded mb-2"
          value={newPrompt.name}
          onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
        />
        <textarea
          placeholder="New Prompt Content"
          className="w-full p-2 rounded border mb-2"
          rows="3"
          value={newPrompt.content}
          onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
        />
        <button onClick={addPrompt} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Add
        </button>
      </div>
    </div>
  );

};

export default ToolBar;