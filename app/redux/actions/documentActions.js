// documentActions.js

export const SET_SELECTED_DOCUMENTS = 'SET_SELECTED_DOCUMENTS';

export const setSelectedDocuments = (documentIds) => ({
  type: SET_SELECTED_DOCUMENTS,
  payload: documentIds
});
