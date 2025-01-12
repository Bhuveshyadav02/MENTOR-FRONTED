import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    profile: null,
    errMess: null,
    isLoading: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.TEACHER_PROFILE_LOADING:
        return { isLoading:true, profile: null, errMess: null };
      case ActionTypes.TEACHER_PROFILE_FAILED:
        return { isLoading:false, profile: null, errMess: action.payload};  
      case ActionTypes.TEACHER_PROFILE_SUCCESS:
        return { isLoading:false, profile: action.payload, errMess: null};    
      default:
        return state;
    }
  };
  
  export default reducer;