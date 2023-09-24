import React, { useState, useEffect } from "react";
import DocumentService from "../services/DocumentService";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDocuments } from '../redux/actions/documentActions';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await DocumentService.fetchUserDocuments();
        setDocuments(data);
      } catch (e) {
        setError("An error occurred while fetching documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDocumentClick = (id) => {
    let newSelectedDocumentIds;
    if (selectedDocumentIds.includes(id)) {
      newSelectedDocumentIds = selectedDocumentIds.filter((docId) => docId !== id);
    } else {
      newSelectedDocumentIds = [...selectedDocumentIds, id];
    }
    setSelectedDocumentIds(newSelectedDocumentIds);
    dispatch(setSelectedDocuments(newSelectedDocumentIds)); // 这一行将更新 Redux 的状态
  };

  if (loading) {
    return <div className="text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
    );
  }

  return (
    <div className="document-list bg-gray-50 overflow-y-auto custom-scrollbar p-2 rounded-lg">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Documents' : 'Show Documents'}
      </button>
      {isExpanded && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">User Documents</h1>
          <ul className="divide-y divide-gray-200  h-[calc(100vh - 200px)] ">
            {documents.map((document) => (
              <li 
                key={document.id} 
                className={`py-4 ${selectedDocumentIds.includes(document.id) ? 'bg-blue-100' : ''}`}
                onClick={() => handleDocumentClick(document.id)}
              >
                {document.filename}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
