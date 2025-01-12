import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    batch: null,
    isLoading: false,
    errMess: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.BATCH_LOADING:
        return { batch: null, isLoading: true, errMess: null };
      case ActionTypes.BATCH_FAILED:
        return { batch: null, isLoading: false, errMess: action.payload };  
      case ActionTypes.BATCH_SUCCESS:
        return { batch: action.payload, isLoading: false, errMess: null };  
      default:
        return state;
    }
  };
  
  export default reducer;