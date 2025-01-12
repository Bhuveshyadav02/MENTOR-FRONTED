import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        isTeacher: localStorage.getItem('isTeacher') ? JSON.parse(localStorage.getItem('isTeacher')) : false,
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.TEACHER_LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                isTeacher: false,
                user: action.creds
            };
        case ActionTypes.TEACHER_LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                isTeacher: true,
                errMess: '',
                token: action.token
            };
        case ActionTypes.TEACHER_LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                isTeacher: false,
                errMess: action.message
            };
        case ActionTypes.TEACHER_LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true,
                isTeacher: true
            };
        case ActionTypes.TEACHER_LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                isTeacher: false,
                token: '',
                user: null
            };


        case ActionTypes.STUDENT_LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                isTeacher: false,
                user: action.creds
            };
        case ActionTypes.STUDENT_LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                isTeacher: false,
                errMess: '',
                token: action.token
            };
        case ActionTypes.STUDENT_LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                isTeacher: false,
                errMess: action.message
            };
        case ActionTypes.STUDENT_LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isTeacher: false,
                isAuthenticated: true
            };
        case ActionTypes.STUDENT_LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                isTeacher: false,
                token: '',
                user: null
            };
        default:
            return state
    }
}