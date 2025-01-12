import React, { useState} from 'react';
import 'antd/dist/antd.css';
import '../../styles/Register.css';
import StudentSignUp from './studentSignUp';
import FacultySignUp from './facultySignUp';
import MessageComponent from '../Registration/messageComponent';

function DisplayMessage({message, removeMessage}) {
    if(message.showMessage){
        const mess = message.showMessage;
        // removeMessage();
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

const Register = (props) => {

    const [currentState, setCurrentState] = useState(1);

    return (
        <div className="login-page">
            <DisplayMessage message = {props.message} removeMessage = {props.removeMessage}/>
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
                </div>
                <div className="form-Box">
                    <div className='formHeader'>
                        <div
                            className={currentState ? 'headerActive' : 'headerInActive'}
                            onClick={() => {

                                setCurrentState(1);

                            }}
                        >
                            <button className='headerButton'> Faculty </button>
                        </div>
                        <div
                            className={currentState ? 'headerInActive' : 'headerActive'}
                            onClick={() => {
                                setCurrentState(0);
                            }}
                        >
                            <button className='headerButton'> Student </button>
                        </div>

                    </div>
                    <div className='formBody'>
                        {
                            currentState ? 
                            <FacultySignUp 
                                createTeacher = {props.createTeacher}
                            /> 
                            : 
                            <StudentSignUp 
                                createStudent = {props.createStudent}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};





export default Register;
