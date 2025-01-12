import React, { useState } from 'react';
import '../../styles/profile.css';
import ProfileUi from 'react-profile-card';
import { Card } from 'react-bootstrap';
import TabSection from './TabComponent';
import { useParams } from'react-router';
import LoadingComponent from '../LoadingComponent';
import demoImage from '../../images/demo-user.jpg';

function LoadProfile(props) {
   if(props.student.profile != null){
    return (
        <div className="contents">
            <div className="profiles">
                <div className="profile1">
                    <ProfileUi
                        imgUrl= {demoImage}
                        name={props.student.profile.name}
                    />
                </div>
                <div className="profile2">
                    <Card style={{ width: '100%', height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Details of student</Card.Title>

                            <div class="card-collection ">
                                <div class="row-1 infotable">
                                    <div className="info">
                                        <p class="row-p">Enrollment Number</p>
                                        <p><strong>{props.student.profile.username}</strong></p>
                                    </div>
                                    <div className="info">
                                        <p class="row-p">Admission Date</p>
                                        <p><strong>{props.student.profile.admissionDate}</strong></p>
                                    </div>
                                    <div className="info">
                                        <p class="row-p">Phone Number</p>
                                        <p><strong>{props.student.profile.phoneNumber}</strong></p>
                                    </div>
                                </div>
                                <div class="infotable"><hr /></div>
                                <div class="row-1 infotable">
                                    <div className="info">
                                        <p class="row-p">Email</p>
                                        <p><strong>{props.student.profile.email}</strong></p>
                                    </div>
                                    <div className="info">
                                        <p class="row-p" >Degree</p>
                                        <p><strong>{props.student.profile.degree}</strong></p>
                                    </div>
                                    <div className="info">
                                        <p class="row-p">Branch</p>
                                        <p><strong>{props.student.profile.branch}</strong></p>

                                    </div>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="content1">
                <TabSection student = {props.student} 
                            addInternship = {props.addInternship} 
                            deleteInternship = {props.deleteInternship}
                            addCourse = {props.addCourse}
                            deleteCourse = {props.deleteCourse}
                            result = {props.result}
                            addResult = {props.addResult}
                            editResult = {props.editResult}
                            deleteResult = {props.deleteResult}
                            addAbsence = {props.addAbsence}
                            deleteAbsence = {props.deleteAbsence}
                            addActivity = {props.addActivity}
                            deleteActivity = {props.deleteActivity}
                            auth={props.auth}
                />
            </div>
        </div>
    );
   } 
   else if(props.student.errMess){
       return(
           <h2>{props.student.errMess}</h2>
       );
   }
   else {
       return(
            <LoadingComponent />
       );
   }
}

function Profiles(props) {
    var { studentId } = useParams();
    console.log(window.location.href);
    if(window.location.href == "http://localhost:3000/student/home" && props.auth.isTeacher){
        return(
            <h2>Access Denied</h2>
        );
    }
    if(props.auth.isTeacher){
        if (!props.student.errMess && !props.student.isLoading) {
            if(props.student.profile == null)
                props.loadStudentProfile(studentId);
            else if(props.student.profile._id != studentId)
                props.loadStudentProfile(studentId);
        }
    }
    else {
        if (!props.student.errMess && !props.student.isLoading) {
            if(props.student.profile == null)
                props.loadLoggedStudent();
        }
    }
    return (
            <LoadProfile 
                student = {props.student} 
                addInternship = {props.addInternship} 
                deleteInternship = {props.deleteInternship}
                addCourse = {props.addCourse}
                deleteCourse = {props.deleteCourse}
                result = {props.result}
                addResult = {props.addResult}
                editResult = {props.editResult}
                deleteResult = {props.deleteResult}
                addAbsence = {props.addAbsence}
                deleteAbsence = {props.deleteAbsence}
                addActivity = {props.addActivity}
                deleteActivity = {props.deleteActivity}
                auth={props.auth}
            />
    );
}

export default Profiles;