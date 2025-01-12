import * as ActionTypes from './ActionTypes';

const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.REDIRECT:
        return { redirectTo: action.payload };
    //   case ActionTypes.REMOVE_REDIRECT:
    //     return { redirectTo: false};  
      default:
        return state;
    }
  };
  
  export default reducer;