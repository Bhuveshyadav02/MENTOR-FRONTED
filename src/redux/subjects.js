import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    subjects: null,
    errMess: null,
    isLoading: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.SUBJECTS_LOADING:
        return { isLoading:true, subjects: null, errMess: null };
      case ActionTypes.SUBJECTS_FAILED:
        return { isLoading:false, subjects: null, errMess: action.payload};  
      case ActionTypes.SUBJECTS_SUCCESS:
        return { isLoading:false, subjects: action.payload, errMess: null};    
      default:
        return state;
    }
  };
  
  export default reducer;