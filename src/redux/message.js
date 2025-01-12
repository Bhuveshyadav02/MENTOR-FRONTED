import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    showMessage: null
    }, action) => {
    switch (action.type) {
      case ActionTypes.MESSAGE:
        return { showMessage: action.payload };
      case ActionTypes.REMOVE_MESSAGE:
        return { showMessage: null};  
      default:
        return state;
    }
  };
  
  export default reducer;