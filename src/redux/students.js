import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    students: null,
    isLoading: false,
    errMess: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.STUDENT_IN_BATCH_LOADING:
        return { students: null, isLoading: true, errMess: null };
      case ActionTypes.STUDENT_IN_BATCH_FAILED:
        return { students: null, isLoading: false, errMess: action.payload };  
      case ActionTypes.STUDENT_IN_BATCH_SUCCESS:
        return { students: action.payload, isLoading: false, errMess: null };  
      default:
        return state;
    }
  };
  
  export default reducer;