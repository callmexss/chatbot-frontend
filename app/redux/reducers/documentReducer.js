import { SET_SELECTED_DOCUMENTS } from '../actions/documentActions';

const initialState = {
  selectedDocumentIds: []
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DOCUMENTS:
      return {
        ...state,
        selectedDocumentIds: action.payload
      };
    default:
      return state;
  }
};

export default documentReducer;
