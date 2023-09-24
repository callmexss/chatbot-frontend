const initialState = {
  selectedDocumentId: null,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DOCUMENT':
      return { ...state, selectedDocumentId: action.payload };
    case 'CLEAR_SELECTED_DOCUMENT':
      return { ...state, selectedDocumentId: null };
    default:
      return state;
  }
};

export default documentReducer;
