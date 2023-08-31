import { useState, useEffect } from 'react';

export const SystemPromptManager = ({ setSystemPrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [editablePrompt, setEditablePrompt] = useState({ name: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromptId, setCurrentPromptId] = useState(null);

  const addOrUpdatePrompt = () => {
    const apiUrl = editablePrompt.id
      ? `http://localhost:8000/chat/system-prompts/${editablePrompt.id}/`
      : 'http://localhost:8000/chat/system-prompts/';

    const method = editablePrompt.id ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editablePrompt),
    })
    .then((response) => response.json())
    .then((data) => {
      if (editablePrompt.id) {
        // Update the existing prompt in the UI
        setPrompts(prompts.map((p) => (p.id === editablePrompt.id ? data : p)));
      } else {
        // Add the new prompt to the UI
        setPrompts([...prompts, data]);
      }
      // Reset the editable prompt
      setEditablePrompt({ name: '', content: '' });
      setIsEditing(false);
    });
  };

  useEffect(() => {
    // Fetch the system prompts from the backend
    fetch('http://localhost:8000/chat/system-prompts/')
      .then((response) => response.json())
      .then((data) => setPrompts(data));
  }, []);

  const editPrompt = (prompt) => {
    setIsEditing(true);
    setEditablePrompt(prompt);
  };

  const deletePrompt = (id) => {
    fetch(`http://localhost:8000/chat/system-prompts/${id}/`, {
      method: 'DELETE',
    }).then(() => {
      setPrompts(prompts.filter((prompt) => prompt.id !== id));
    });
  };

  const usePrompt = (id, content) => {
    if (id === currentPromptId) {
      // Cancel use
      setSystemPrompt('');
      setCurrentPromptId(null);
    } else {
      // Use new
      setSystemPrompt(content);
      setCurrentPromptId(id);
    }
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg">
      {/* System Prompt Editing Area */}
      <div className="mb-4 p-2 rounded-lg bg-white shadow">
        <input 
          type="text" 
          placeholder="Prompt Name" 
          className="w-full p-2 border rounded mb-1 text-sm"
          value={editablePrompt.name}
          onChange={(e) => setEditablePrompt({ ...editablePrompt, name: e.target.value })}
        />
        <textarea
          placeholder="Prompt Content"
          className="w-full p-2 rounded border mb-1 text-sm"
          rows="3"
          value={editablePrompt.content}
          onChange={(e) => setEditablePrompt({ ...editablePrompt, content: e.target.value })}
        />
        <div className="text-xs">
          <button onClick={addOrUpdatePrompt} className="bg-blue-500 text-white px-3 py-1 rounded shadow">
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button onClick={() => {
              setIsEditing(false)
              setEditablePrompt({ name: '', content: '' })
            }} className="bg-gray-500 text-white px-3 py-1 rounded shadow ml-2">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Prompt List */}
      <div className="mt-2 max-h-48 overflow-y-auto custom-scrollbar">
        {prompts.map((prompt) => (
          <div key={prompt.id} className={`mb-1 p-2 rounded-lg ${currentPromptId === prompt.id ? 'bg-blue-100' : 'bg-white'} shadow flex justify-between items-center`}>
            <div className="text-sm flex-grow text-gray-700">
              <span title={prompt.content}>
                {prompt.name}
              </span>
            </div>
            <div className="flex space-x-2 text-xs">
              <button 
                className="text-green-500 hover:text-green-700"
                onClick={() => usePrompt(prompt.id, prompt.content)}>
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
    </div>
  );



};

export default SystemPromptManager;