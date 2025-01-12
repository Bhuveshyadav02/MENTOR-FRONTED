import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    batches: null,
    isLoading: false,
    errMess: null
    }, action) => {
    switch (action.type) {
      case ActionTypes.BATCHES_LOADING:
        return { batches: null, isLoading: true, errMess: null };
      case ActionTypes.BATCHES_FAILED:
        return { batches: null, isLoading: false, errMess: action.payload };  
      case ActionTypes.BATCHES_SUCCESS:
        return { batches: action.payload, isLoading: false, errMess: null };  
      default:
        return state;
    }
  };
  
  export default reducer;