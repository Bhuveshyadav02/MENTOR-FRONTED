import * as ActionTypes from './ActionTypes';

const reducer = (state = {
    certificate: null,
    errMess: null,
    isLoading: false
    }, action) => {
    switch (action.type) {
      case ActionTypes.INTERNSHIP_CERTIFICATE_LOADING:
        return { isLoading:true, certificate: null, errMess: null };
      case ActionTypes.INTERNSHIP_CERTIFICATE_FAILED:
        return { isLoading:false, certificate: null, errMess: action.payload};  
      case ActionTypes.INTERNSHIP_CERTIFICATE_SUCCESS:
        return { isLoading:false, certificate: action.payload, errMess: null};    
      default:
        return state;
    }
  };
  
  export default reducer;