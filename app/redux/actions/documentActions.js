export const setSelectedDocument = (documentId) => {
  return {
    type: 'SET_SELECTED_DOCUMENT',
    payload: documentId,
  };
};

export const clearSelectedDocument = () => {
  return {
    type: 'CLEAR_SELECTED_DOCUMENT',
  };
};
