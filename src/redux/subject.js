import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    subject: null,
    errMess: null,
    isLoading: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.SUBJECT_LOADING:
        return { isLoading:true, subject: null, errMess: null };
      case ActionTypes.SUBJECT_FAILED:
        return { isLoading:false, subject: null, errMess: action.payload};  
      case ActionTypes.SUBJECT_SUCCESS:
        return { isLoading:false, subject: action.payload, errMess: null};    
      default:
        return state;
    }
  };
  
  export default reducer;