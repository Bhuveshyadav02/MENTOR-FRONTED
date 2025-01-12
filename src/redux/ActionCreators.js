import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../component/baseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';


//TEACHER AUTHENTICATION
export const teacherRequestLogin = (creds) => {
    return {
        type: ActionTypes.TEACHER_LOGIN_REQUEST,
        creds
    }
}
export const teacherReceiveLogin = (response) => {
    return {
        type: ActionTypes.TEACHER_LOGIN_SUCCESS,
        token: response.token
    }
}
export const teacherLoginError = (message) => {
    return {
        type: ActionTypes.TEACHER_LOGIN_FAILURE,
        message
    }
}
export const loginTeacher = (creds) => (dispatch) => {
    // We dispatch teacherRequestLogin to kickoff the call to the API
    dispatch(teacherRequestLogin(creds))

    return fetch(baseUrl + 'teachers/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('isTeacher', true);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(teacherReceiveLogin(response));
            dispatch(addMessage("LOGIN SUCCECCFUL"));
            dispatch(redirect("/teacher/home"));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(teacherLoginError(error.message)))
};
export const teacherRequestLogout = () => {
    return {
      type: ActionTypes.TEACHER_LOGOUT_REQUEST
    }
}
export const teacherReceiveLogout = () => {
    return {
      type: ActionTypes.TEACHER_LOGOUT_SUCCESS
    }
}
export const logoutTeacher = () => (dispatch) => {
    dispatch(teacherRequestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('isTeacher');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(teacherReceiveLogout())
}

//STUDENT AUTHENTICATION
export const studentRequestLogin = (creds) => {
    return {
        type: ActionTypes.STUDENT_LOGIN_REQUEST,
        creds
    }
}  
export const studentReceiveLogin = (response) => {
    return {
        type: ActionTypes.STUDENT_LOGIN_SUCCESS,
        token: response.token
    }
} 
export const studentLoginError = (message) => {
    return {
        type: ActionTypes.STUDENT_LOGIN_FAILURE,
        message
    }
}
export const loginStudent = (creds) => (dispatch) => {
    // We dispatch studentRequestLogin to kickoff the call to the API
    dispatch(studentRequestLogin(creds))

    return fetch(baseUrl + 'students/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('isTeacher', false);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(studentReceiveLogin(response));
            dispatch(addMessage("LOGIN SUCCECCFUL"));
            dispatch(redirect("/student/home"));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(studentLoginError(error.message)))
};
export const studentRequestLogout = () => {
    return {
      type: ActionTypes.STUDENT_LOGOUT_REQUEST
    }
}
export const studentReceiveLogout = () => {
    return {
      type: ActionTypes.STUDENT_LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutStudent = () => (dispatch) => {
    dispatch(studentRequestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('isTeacher');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(studentReceiveLogout())
}

export const redirect = link => {
    console.log("=== REDIRECT ACTION DISPATCHED ===");
    return { type: ActionTypes.REDIRECT, payload: link };
  };


export const showMessage = (message) => {
    return {
        type:ActionTypes.MESSAGE,
        payload: message
    }
}
export const remMessage = (message) => {
    return {
        type:ActionTypes.REMOVE_MESSAGE,
    }
}
export const removeMessage = () => (dispatch) => {
    dispatch(remMessage());
}
export const addMessage = (message) => (dispatch) => {
    dispatch(showMessage(message));
}

export const teacherProfileLoading = () => {
    return {
        type:ActionTypes.TEACHER_PROFILE_LOADING
    }
}
export const teacherProfileFailed = (errMess) => {
    return {
        type:ActionTypes.TEACHER_PROFILE_FAILED,
        payload: errMess
    }
}
export const teacherProfileSuccess = (user) => {
    return {
        type:ActionTypes.TEACHER_PROFILE_SUCCESS,
        payload: user
    }
}
export const loadTeacherProfile = () => (dispatch) => {
    dispatch(teacherProfileLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'teachers/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(teacherProfileSuccess(response)))
    .then(() => dispatch(loadBatches()))
    .catch(error => dispatch(teacherProfileFailed(error)))
}


export const batchesLoading = () => {
    return{
        type: ActionTypes.BATCHES_LOADING
    }
}
export const batchesSuccess = (batches) => {
    return{
        type: ActionTypes.BATCHES_SUCCESS,
        payload: batches
    }
}
export const batchesFailed = (errMess) => {
    return{
        type: ActionTypes.BATCHES_FAILED,
        payload: errMess
    }
}
export const loadBatches = () => (dispatch) => {
    dispatch(batchesLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'mentoring', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(batchesSuccess(response)))
    .catch(error => dispatch(batchesFailed(error)))
}

export const batchLoading = () => {
    return{
        type: ActionTypes.BATCH_LOADING
    }
}
export const batchSuccess = (batch) => {
    return{
        type: ActionTypes.BATCH_SUCCESS,
        payload: batch
    }
}
export const batchFailed = (errMess) => {
    return{
        type: ActionTypes.BATCH_FAILED,
        payload: errMess
    }
}
export const loadBatch = (batchId) => (dispatch) => {
    dispatch(batchLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'mentoring/' + batchId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(batchSuccess(response)))
    .then(() => dispatch(loadStudentBatch(batchId)))
    .catch(error => dispatch(batchFailed(error)))
}

export const batchStudentLoading = () => {
    return{
        type: ActionTypes.STUDENT_IN_BATCH_LOADING
    }
}
export const batchStudentSuccess = (students) => {
    return{
        type: ActionTypes.STUDENT_IN_BATCH_SUCCESS,
        payload: students
    }
}
export const batchStudentFailed = (errMess) => {
    return{
        type: ActionTypes.STUDENT_IN_BATCH_FAILED,
        payload: errMess
    }
}
export const loadStudentBatch = (batchId) => (dispatch) => {
    dispatch(batchStudentLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'mentoring/' + batchId +'/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(batchStudentSuccess(response)))
    .catch(error => dispatch(batchStudentFailed(error)))
}



export const deleteBatch = (batchId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring/' + batchId , {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Batch Deleted Successfully")))
    .then(() => dispatch(loadBatches()))
    .catch(error => dispatch(addMessage(error)))
}

export const addStudent = (batchId, student) => (dispatch) => {
    const bearer =  localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring/' + batchId + '/students', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Student Added Successfully")))
    .then(() => dispatch(loadStudentBatch(batchId)))
    .catch(error => dispatch(addMessage(error)))
}

export const deleteStudent = (batchId, studentId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring/' + batchId + '/students/' + studentId , {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Student Deleted Successfully")))
    .then(() => dispatch(loadStudentBatch(batchId)))
    .catch(error => dispatch(addMessage(error)))
}

export const addMeeting = (batchId, meeting) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring/' + batchId + '/meetings', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(meeting)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Meeting Added Successfully")))
    .then(() => dispatch(loadBatch(batchId)))
    .catch(error => dispatch(addMessage(error)))
}

export const deleteMeeting = (batchId, meetingId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring/' + batchId + '/meetings/' + meetingId , {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Meeting Deleted Successfully")))
    .then(() => dispatch(loadBatch(batchId)))
    .catch(error => dispatch(addMessage(error)))
}

export const studentProfileLoading = () => {
    return {
        type:ActionTypes.STUDENT_PROFILE_LOADING
    }
}
export const studentProfileFailed = (errMess) => {
    return {
        type:ActionTypes.STUDENT_PROFILE_FAILED,
        payload: errMess
    }
}
export const studentProfileSuccess = (user) => {
    return {
        type:ActionTypes.STUDENT_PROFILE_SUCCESS,
        payload: user
    }
}
export const loadStudentProfile = (studentId) => (dispatch) => {
    dispatch(studentProfileLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(studentProfileSuccess(response)))
    .then((response) => dispatch(loadResultTeacher(studentId)))
    .catch(error => dispatch(studentProfileFailed(error)))
}

export const loadLoggedStudent = () => (dispatch) => {
    dispatch(studentProfileLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(studentProfileSuccess(response)))
    .then(() => dispatch(loadResultStudent()))
    .catch(error => dispatch(studentProfileFailed(error)))
}

export const internshipCertificateLoading = () => {
    return {
        type:ActionTypes.INTERNSHIP_CERTIFICATE_LOADING
    }
}
export const internshipCertificateFailed = (errMess) => {
    return {
        type:ActionTypes.INTERNSHIP_CERTIFICATE_FAILED,
        payload: errMess
    }
}
export const internshipCertificateSuccess = (certificate) => {
    return {
        type:ActionTypes.INTERNSHIP_CERTIFICATE_SUCCESS,
        payload: certificate
    }
}
export const loadInternshipCertificate = (studentId, certificateId) => (dispatch) => {
    dispatch(internshipCertificateLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId + '/internships/' +certificateId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(internshipCertificateSuccess(response)))
    .catch(error => dispatch(internshipCertificateFailed(error)))
}

export const addInternship = (internship) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return axios.post(baseUrl + "students/internships", internship, {
            headers: { 
                'Content-Type':'multipart/form-data',
                'Authorization': bearer
            }
        })
    .then(response => {
        if (response.status ==200) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then((response) => dispatch(addMessage("Internship Added Successfully")))
    .then((response) => dispatch(loadLoggedStudent()))
    .catch(error => dispatch(addMessage(error)))
}
export const deleteInternship = (internshipId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + "students/internships/" + internshipId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Internship Deleted Successfully")))
    .then(() => dispatch(loadLoggedStudent()))
    .catch(error => dispatch(addMessage(error)))
}

export const addCourse = (course) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return axios.post(baseUrl + "students/courses", course, {
            headers: { 
                'Content-Type':'multipart/form-data',
                'Authorization': bearer
            }
        })
    .then(response => {
        if (response.status ==200) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then((response) => dispatch(addMessage("Course Added Successfully")))
    .then((response) => dispatch(loadLoggedStudent()))
    .catch(error => dispatch(addMessage(error)))
}
export const deleteCourse = (courseId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + "students/courses/" + courseId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Course Deleted Successfully")))
    .then(() => dispatch(loadLoggedStudent()))
    .catch(error => dispatch(addMessage(error)))
}

export const resultLoading = () => {
    return {
        type:ActionTypes.RESULT_LOADING
    }
}
export const resultFailed = (errMess) => {
    return {
        type:ActionTypes.RESULT_FAILED,
        payload: errMess
    }
}
export const resultSuccess = (result) => {
    return {
        type:ActionTypes.RESULT_SUCCESS,
        payload: result
    }
}
export const loadResultTeacher = (studentId) => (dispatch) => {
    dispatch(resultLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId + '/result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(resultSuccess(response)))
    .catch(error => dispatch(resultFailed(error)))
}

export const loadResultStudent = () => (dispatch) => {
    dispatch(resultLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => dispatch(resultSuccess(response)))
    .catch(error => dispatch(resultFailed(error)))
}

export const subjectsLoading = () => {
    return {
        type:ActionTypes.SUBJECTS_LOADING
    }
}
export const subjectsFailed = (errMess) => {
    return {
        type:ActionTypes.SUBJECTS_FAILED,
        payload: errMess
    }
}
export const subjectsSuccess = (certificate) => {
    return {
        type:ActionTypes.SUBJECTS_SUCCESS,
        payload: certificate
    }
}
export const loadSubjectsStudent = (resultId) => (dispatch) => {
    dispatch(subjectsLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'result/' + resultId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(subjectsSuccess(response)))
    .catch(error => dispatch(subjectsFailed(error)))
}
export const loadSubjectsTeacher = (studentId, resultId) => (dispatch) => {
    dispatch(subjectsLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId + '/result/' + resultId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(subjectsSuccess(response)))
    .catch(error => dispatch(subjectsFailed(error)))
}

export const addSubject = (resultId, subject) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/' + resultId + '/subjects', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(subject)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Subject Added Successfully"));
        dispatch(loadSubjectsStudent(resultId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const editSubject = (resultId, subjectId, subject) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/' + resultId + '/subjects/' + subjectId, {
        method: 'PUT',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(subject)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Subject Edited Successfully"));
        dispatch(loadSubjectStudent(resultId, subjectId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const deleteSubject = (resultId, subjectId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/' + resultId + '/subjects/' + subjectId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Subject Deleted Successfully"));
        dispatch(loadSubjectsStudent(resultId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const subjectLoading = () => {
    return {
        type:ActionTypes.SUBJECT_LOADING
    }
}
export const subjectFailed = (errMess) => {
    return {
        type:ActionTypes.SUBJECT_FAILED,
        payload: errMess
    }
}
export const subjectSuccess = (certificate) => {
    return {
        type:ActionTypes.SUBJECT_SUCCESS,
        payload: certificate
    }
}
export const loadSubjectStudent = (resultId, subjectId) => (dispatch) => {
    dispatch(subjectLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'result/' + resultId + '/subjects/'+subjectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(subjectSuccess(response)))
    .catch(error => dispatch(subjectFailed(error)))
}
export const loadSubjectTeacher = (studentId, resultId, subjectId) => (dispatch) => {
    dispatch(subjectLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId + '/result/' + resultId + '/subjects/' + subjectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(subjectSuccess(response)))
    .catch(error => dispatch(subjectFailed(error)))
}

export const addResult = (result) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(result)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Result Added Successfully"));
        dispatch(loadResultStudent());
    })
    .catch(error => dispatch(addMessage(error)))
}

export const editResult = (resultId, result) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/' + resultId, {
        method: 'PUT',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(result)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Result Edited Successfully"));
        dispatch(loadResultStudent());
    })
    .catch(error => dispatch(addMessage(error)))
}

export const deleteResult = (resultId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'result/' + resultId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Result Deleted Successfully"));
        dispatch(loadResultStudent());
    })
    .catch(error => dispatch(addMessage(error)))
}

export const createTeacher = (teacher) => (dispatch) => {
    return fetch(baseUrl + 'teachers/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json'
        },
        body: JSON.stringify(teacher)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Teacher Account Created"));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const createStudent = (student) => (dispatch) => {
    console.log(student);
    return fetch(baseUrl + 'students/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Student Account Created"));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const addAbsence = (studentId, absence) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'students/' + studentId + '/absence', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(absence)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Absence Added Successfully"));
        dispatch(loadStudentProfile(studentId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const deleteAbsence = (studentId, absenceId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'students/' + studentId + '/absence/' + absenceId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Absence Deleted Successfully"));
        dispatch(loadStudentProfile(studentId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const addActivity = (studentId, activity) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'students/' + studentId + '/activity', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(activity)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Activity Added Successfully"));
        dispatch(loadStudentProfile(studentId));
    })
    .catch(error => dispatch(addMessage(error)))
}

export const deleteActivity = (studentId, activityId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'students/' + studentId + '/activity/' + activityId, {
        method: 'DELETE',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addMessage("Activity Deleted Successfully"));
        dispatch(loadStudentProfile(studentId));
    })
    .catch(error => dispatch(addMessage(error)))
}
export const addBatch = (batch) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mentoring', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(batch)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMessage("Batch Created Successfully")))
    .then(() => dispatch(loadBatches()))
    .catch(error => dispatch(addMessage(error)))
}
