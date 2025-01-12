import React, {Component} from "react";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Login from './Registration/signIn';
import Signup from './Registration/signUp';
import TeacherMain from './Teacher/MainComponent';
import StudentMain from './student/MainComponent';
import { connect } from 'react-redux';
import { loginTeacher, logoutTeacher, loginStudent, logoutStudent, loadTeacherProfile, removeMessage, loadBatch, loadStudentBatch} from '../redux/ActionCreators';
import { addBatch, deleteBatch, addStudent, deleteStudent, addMeeting, deleteMeeting,  loadStudentProfile, loadInternshipCertificate } from "../redux/ActionCreators";
import { addInternship, loadLoggedStudent, deleteInternship, addCourse, deleteCourse, loadResultStudent, loadResultTeacher, loadSubjectsStudent, loadSubjectsTeacher } from '../redux/ActionCreators';
import { addSubject, editSubject, deleteSubject, loadSubjectStudent, loadSubjectTeacher } from '../redux/ActionCreators';
import { addResult, editResult, deleteResult, createStudent, createTeacher,  addAbsence, deleteAbsence,  addActivity, deleteActivity } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        redirect: state.redirect,
        message: state.message,
        teacher: state.teacher,
        batches: state.batches,
        batch: state.batch,
        students: state.students,
        student: state.student,
        internship: state.internship,
        result: state.result,
        subjects: state.subjects,
        subject: state.subject
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginStudent: (creds) => dispatch(loginStudent(creds)),
    loginTeacher: (creds) => dispatch(loginTeacher(creds)),
    createStudent: (student) => dispatch(createStudent(student)),
    createTeacher: (teacher) => dispatch(createTeacher(teacher)),
    logoutStudent: () => dispatch(logoutStudent()),
    logoutTeacher: () => dispatch(logoutTeacher()),
    loadTeacherProfile: () => dispatch(loadTeacherProfile()),
    removeMessage: () => dispatch(removeMessage()),
    loadBatch: (batchId) => dispatch(loadBatch(batchId)),
    loadStudentBatch: () => dispatch(loadStudentBatch()),
    addBatch: (batch) => dispatch(addBatch(batch)),
    deleteBatch: (batchId) => dispatch(deleteBatch(batchId)),
    addStudent: (batchId, student) => dispatch(addStudent(batchId, student)),
    deleteStudent: (batchId, student) => dispatch(deleteStudent(batchId, student)),
    addMeeting: (batchId, meeting) => dispatch(addMeeting(batchId, meeting)),
    deleteMeeting: (batchId, meeting) => dispatch(deleteMeeting(batchId, meeting)),
    loadStudentProfile: (studentId) => dispatch(loadStudentProfile(studentId)),
    loadInternshipCertificate: (studentId, certificateId) => dispatch(loadInternshipCertificate(studentId, certificateId)),
    addInternship: (studentId, internship) => dispatch(addInternship(studentId, internship)),
    deleteInternship: (internshipId) => dispatch(deleteInternship(internshipId)),
    addCourse: (studentId, course) => dispatch(addCourse(studentId, course)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
    addSubject: (resultId, subject) => dispatch(addSubject(resultId, subject)),
    editSubject: (resultId, subjectId, subject) => dispatch(editSubject(resultId, subjectId, subject)),
    deleteSubject: (resultId, subjectId) => dispatch(deleteSubject(resultId, subjectId)),
    addResult: (subject) => dispatch(addResult(subject)),
    editResult: (resultId, result) => dispatch(editResult(resultId, result)),
    deleteResult: (resultId) => dispatch(deleteResult(resultId)),
    loadLoggedStudent: () => dispatch(loadLoggedStudent()),
    loadResultStudent: (resultId) => dispatch(loadResultStudent(resultId)),
    loadResultTeacher: (studentId, resultId) => dispatch(loadResultTeacher(studentId, resultId)),
    loadSubjectsStudent: (resultId) => dispatch(loadSubjectsStudent(resultId)),
    loadSubjectsTeacher: (studentId, resultId) => dispatch(loadSubjectsTeacher(studentId, resultId)),
    addAbsence: (studentId, absence) => dispatch(addAbsence(studentId, absence)),
    deleteAbsence: (studentId, absenceId) => dispatch(deleteAbsence(studentId, absenceId)),
    addActivity: (studentId, activity) => dispatch(addActivity(studentId, activity)),
    deleteActivity: (studentId, activityId) => dispatch(deleteActivity(studentId, activityId)),
    loadSubjectStudent: (resultId, subjectId) => dispatch(loadSubjectStudent(resultId, subjectId)),
    loadSubjectTeacher: (studentId, resultId, subjectId) => dispatch(loadSubjectTeacher(studentId, resultId, subjectId))

})

class Home extends Component{
    render(){
        if(this.props.auth.isAuthenticated && this.props.auth.isTeacher && (!this.props.teacher.isLoading) && this.props.teacher.profile == null && !this.props.teacher.errMess) {
            this.props.loadTeacherProfile();
        }
        else if(this.props.auth.isAuthenticated && !this.props.auth.isTeacher && (!this.props.student.isLoading) && this.props.student.profile == null && !this.props.student.errMess) {
            this.props.loadLoggedStudent();
        }
        const LoginPage = () => {
            return(
                <Login 
                    auth = {this.props.auth}
                    message = {this.props.message}
                    loginStudent={this.props.loginStudent} 
                    loginTeacher={this.props.loginTeacher}
                    message={this.props.message} 
                    removeMessage = {this.props.removeMessage} 
                />
            )
        }

        const SignupPage = () => {
            return(
                <Signup
                    auth = {this.props.auth}
                    message = {this.props.message}
                    createStudent={this.props.createStudent} 
                    createTeacher={this.props.createTeacher} 
                    message={this.props.message} 
                    removeMessage = {this.props.removeMessage}
                />
            )
        }

        const TeacherPage = () => {
            return(
                <TeacherMain 
                    message={this.props.message} 
                    teacher = {this.props.teacher}
                    logoutTeacher = {this.props.logoutTeacher}
                    removeMessage = {this.props.removeMessage}
                    batches = {this.props.batches}
                    batch = {this.props.batch}
                    loadBatch = {this.props.loadBatch}
                    students = {this.props.students}
                    loadStudentBatch = {this.props.loadStudentBatch}
                    addBatch = {this.props.addBatch}
                    deleteBatch = {this.props.deleteBatch}
                    addStudent = {this.props.addStudent}
                    deleteStudent = {this.props.deleteStudent}
                    addMeeting = {this.props.addMeeting}
                    deleteMeeting = {this.props.deleteMeeting}
                />
            );
        }

        const StudentPage = () => {
            return(
                <StudentMain 
                    message={this.props.message} 
                    removeMessage = {this.props.removeMessage}
                    loadStudentProfile = {this.props.loadStudentProfile}
                    student = {this.props.student}
                    teacher = {this.props.teacher}
                    internship = {this.props.internship}
                    loadInternshipCertificate = {this.props.loadInternshipCertificate}
                    addInternship = {this.props.addInternship}
                    deleteInternship = {this.props.deleteInternship}
                    addCourse = {this.props.addCourse}
                    deleteCourse = {this.props.deleteCourse}
                    addSubject = {this.props.addSubject}
                    editSubject = {this.props.editSubject}
                    deleteSubject = {this.props.deleteSubject}
                    addResult = {this.props.addResult}
                    editResult = {this.props.editResult}
                    deleteResult = {this.props.deleteResult}
                    auth = {this.props.auth}
                    loadLoggedStudent = {this.props.loadLoggedStudent}
                    logoutStudent = {this.props.logoutStudent}
                    logoutTeacher = {this.props.logoutTeacher}
                    result = {this.props.result}
                    subjects = {this.props.subjects}
                    subject = {this.props.subject}
                    loadResultStudent = {this.props.loadResultStudent}
                    loadResultTeacher = {this.props.loadResultTeacher}
                    loadSubjectsStudent = {this.props.loadSubjectsStudent}
                    loadSubjectsTeacher = {this.props.loadSubjectsTeacher}
                    loadSubjectStudent = {this.props.loadSubjectStudent}
                    loadSubjectTeacher = {this.props.loadSubjectTeacher}
                    addAbsence = {this.props.addAbsence}
                    deleteAbsence = {this.props.deleteAbsence}
                    addActivity = {this.props.addActivity}
                    deleteActivity = {this.props.deleteActivity}
                />
            );
        }

        const TeacherPrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated && this.props.auth.isTeacher
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
        );

        const StudentPrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated && (!this.props.auth.isTeacher)
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
        );
        
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
        );

        if (this.props.redirect.redirectTo) {
            const path=this.props.redirect.redirectTo;
            this.props.redirect.redirectTo = false;
            return <Redirect to={path} />;
        }

        return(
                <Switch>
                    <Route path = "/login" component = {LoginPage}/>
                    <Route path = "/signup" component = {SignupPage}/>
                    <TeacherPrivateRoute path = "/teacher" component = {TeacherPage} />
                    <PrivateRoute path = "/student" component = {StudentPage}/>
                    <StudentPrivateRoute path = "/student/home" component = {StudentPage}/>
                    <Redirect to="/login"/>
                </Switch>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));