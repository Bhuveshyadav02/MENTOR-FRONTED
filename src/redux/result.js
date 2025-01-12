import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    result: null,
    errMess: null,
    isLoading: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.RESULT_LOADING:
        return { isLoading:true, result: null, errMess: null };
      case ActionTypes.RESULT_FAILED:
        return { isLoading:false, result: null, errMess: action.payload};  
      case ActionTypes.RESULT_SUCCESS:
        return { isLoading:false, result: action.payload, errMess: null};    
      default:
        return state;
    }
  };
  
  export default reducer;