import React from 'react';
import Header from './HeaderComponent';
import NavigationBar from './NavbarComponent';
import { Route, Redirect, Switch} from 'react-router-dom';
import ProfileComponent from './ProfileComponent';
import ResultComponent from './ResultComponent';
import SubjectComponent from './SubjectComponent';
import MessageComponent from '../Registration/messageComponent';

function DisplayMessage({message, removeMessage}) {
    if(message.showMessage){
        const mess = message.showMessage;
        return(
            <MessageComponent message={mess} removeMessage={removeMessage}/>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function Main(props) {
    const StudentPrivateRoute = ({component: Component, ...rest}) => {
        return (
            <Route {...rest} render={props => (
                (!props.auth.isTeacher) ?
                    <Component {...props} />
                : <Redirect to="/teacher/home" />
            )} />
        );
    };

    const ResultPage = () => {
        return(
            <ResultComponent 
                    loadSubjectsStudent = {props.loadSubjectsStudent}
                    loadSubjectsTeacher = {props.loadSubjectsTeacher}
                    auth = {props.auth}
                    subjects = {props.subjects}
                    addSubject = {props.addSubject}
                    deleteSubject = {props.deleteSubject}
                    editResult = {props.editResult}
            />
        );
    }

    const ProfilePage = () => {
        return(
            <ProfileComponent
                loadStudentProfile = {props.loadStudentProfile}
                student = {props.student}
                auth = {props.auth}
                loadLoggedStudent = {props.loadLoggedStudent}
                addInternship = {props.addInternship}
                deleteInternship = {props.deleteInternship}
                addCourse = {props.addCourse}
                deleteCourse = {props.deleteCourse}
                result = {props.result}
                addResult = {props.addResult}
                deleteResult = {props.deleteResult}
                addAbsence = {props.addAbsence}
                deleteAbsence = {props.deleteAbsence}
                addActivity = {props.addActivity}
                deleteActivity = {props.deleteActivity}
            />
        );
    }

    const SubjectPage = () => {
        return(
            <SubjectComponent 
                subject = {props.subject}
                loadSubjectStudent = {props.loadSubjectStudent}
                loadSubjectTeacher = {props.loadSubjectTeacher}
                auth = {props.auth}
                editSubject = {props.editSubject}
            />
        );
    }
    return (
        <div className="app">
             <DisplayMessage message = {props.message} removeMessage = {props.removeMessage}/>
            <div className='navss'>
                <Header student = {props.student} 
                    logoutStudent = {props.logoutStudent} 
                    auth={props.auth}
                    logoutTeacher = {props.logoutTeacher}
                />
            </div>
            <div className="containers">
                <NavigationBar 
                    student = {props.student} 
                    logoutStudent = {props.logoutStudent}
                    auth={props.auth}
                    logoutTeacher = {props.logoutTeacher}
                    teacher = {props.teacher}
                />
            </div>
            <div className="container mainSection">
                <Switch>
                    <Route exact path="/student/:studentId" component={ProfilePage}/>
                    <StudentPrivateRoute exact path="/student/home" component={ProfilePage}/>
                    <Route exact path="/student/:studentId/result/:resultId" component={ResultPage}/>
                    <Route exact path="/student/:studentId/result/:resultId/:subjectId" component={SubjectPage}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        </div>
    );
}

export default Main;
