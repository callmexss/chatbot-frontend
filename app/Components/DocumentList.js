import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDocument, clearSelectedDocument } from '../redux/actions/documentActions';
import DocumentService from "../services/DocumentService";


const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const selectedDocumentId = useSelector((state) => state.document.selectedDocumentId);


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
    if (selectedDocumentId === id) {
      dispatch(clearSelectedDocument());
    } else {
      dispatch(setSelectedDocument(id));
    }
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
    <div className="document-list">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Documents' : 'Show Documents'}
      </button>
      {isExpanded && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">User Documents</h1>
          <ul className="divide-y divide-gray-200">
            {documents.map((document) => (
              <li 
                key={document.id} 
                className={`py-4 ${selectedDocumentId === document.id ? 'bg-blue-100' : ''}`}
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
