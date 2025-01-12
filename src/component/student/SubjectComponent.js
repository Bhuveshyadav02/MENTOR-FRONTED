import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingComponent from '../LoadingComponent';
import { useParams } from 'react-router';

function AddInternshipForm(props) {
    const onFinish = e => {
        e.preventDefault();
        const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries());
        props.editSubject(props.resultId, props.subjectId , formDataObj);
    };

    return (
            <Form onSubmit={onFinish}>
                <Row>
                    <Col>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control required type="text" value = {props.subject.subject.course.courseCode}/>
                    </Col>
                    <Col>
                        <Form.Label>Credits</Form.Label>
                        <Form.Control required type="number" value = {props.subject.subject.credits}/>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Label>MST 1</Form.Label>
                        <Form.Control name="mst1" type="number"/>
                    </Col>
                    <Col>
                        <Form.Label>MST 2</Form.Label>
                        <Form.Control name="mst2" type="number"/>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Label>Attendence Theory</Form.Label>
                        <Form.Control name="attendenceT" type="number"/>
                    </Col>
                    <Col>
                        <Form.Label>Attendence Practical</Form.Label>
                        <Form.Control name="attendenceP" type="number"/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>End Semester Theory Grade</Form.Label>
                        <Form.Select aria-label="Default select example" name="endSemT">
                            <option>-</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="P">P</option>
                            <option value="G">P(G)</option>
                            <option value="Q">Q</option>
                            <option value="F">F</option>
                            <option value="Ab">Ab</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>End Semester Practical Grade</Form.Label>
                        <Form.Select aria-label="Default select example" name="endSemP">
                            <option>-</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="P">P</option>
                            <option value="G">P(G)</option>
                            <option value="Q">Q</option>
                            <option value="F">F</option>
                            <option value="Ab">Ab</option>
                        </Form.Select>
                    </Col>
                </Row>
            
                <Row>
                    <Col>
                        <Form.Check 
                            checked = {props.subject.subject.isTheory}
                            type="checkbox"
                            id="isTheory"
                            label="isTheory"
                        />
                        <Form.Check 
                            checked = {props.subject.subject.isPractical}
                            type="checkbox"
                            id="isPractical"
                            label="isPractical"
                        />
                    </Col>
                </Row>
                <Form.Group>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "10px" }}>
                    Submit
                    </Button>
                </Form.Group>
            </Form>
    )
}

function AddInternshipModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Subject
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p style={{color: "Red"}}>FILL ALL THE CELLS WHICH ARE NOT FILLED</p>
          <AddInternshipForm subject = {props.subject} 
                    editSubject = {props.editSubject}
                    resultId = {props.resultId}
                    subjectId = {props.subjectId}
            />
        </Modal.Body>
      </Modal>
    );
}

function LoadSubject(props){
    const [modalShow, setModalShow] = React.useState(false);
    if(props.subject.subject != null){
        return (
            <>
            {props.auth.isTeacher ?
            <div></div>
            :
            <div  className="addButton">
                <Button onClick={() => setModalShow(true)}>
                    Edit Subject
                </Button>

                <AddInternshipModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    subject = {props.subject}
                    editSubject = {props.editSubject}
                    resultId = {props.resultId}
                    subjectId = {props.subjectId}
                />
            </div>
            }
            <Form>
                <Row style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Col>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control type="text" readOnly value={props.subject.subject.course.courseCode}/>
                    </Col>
                    <Col>
                        <Form.Label>Subject name</Form.Label>
                        <Form.Control type="text" readOnly value={props.subject.subject.course.name}/>
                    </Col>
                    <Col>
                        <Form.Label>Credits</Form.Label>
                        <Form.Control type="number" readOnly value={props.subject.subject.credits}/>
                    </Col>
                </Row>
                
                <Row style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Col>
                        <Form.Label>MST 1</Form.Label>
                        <Form.Control type="number" readOnly value={props.subject.subject.mst1}/>
                    </Col>
                    <Col>
                        <Form.Label>MST 2</Form.Label>
                        <Form.Control type="number" readOnly value={props.subject.subject.mst2}/>
                    </Col>
                    <Col>
                        <Form.Label>Attendence Theory</Form.Label>
                        <Form.Control type="number" readOnly value={props.subject.subject.attendenceT}/>
                    </Col>
                    <Col>
                        <Form.Label>Attendence Practical</Form.Label>
                        <Form.Control type="number" readOnly value={props.subject.subject.attendenceP}/>
                    </Col>
                </Row>

                <Row style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Col>
                        <Form.Label>End Semester Theory Grade</Form.Label>
                        <Form.Select aria-label="Default select example" disabled="true" value={props.subject.subject.endSemT}>
                            <option>-</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="P">P</option>
                            <option value="G">P(G)</option>
                            <option value="Q">Q</option>
                            <option value="F">F</option>
                            <option value="Ab">Ab</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>End Semester Practical Grade</Form.Label>
                        <Form.Select aria-label="Default select example" disabled="true" value={props.subject.subject.endSemP}>
                            <option>-</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B" selected>B</option>
                            <option value="C">C</option>
                            <option value="P">P</option>
                            <option value="G">P(G)</option>
                            <option value="Q">Q</option>
                            <option value="F">F</option>
                            <option value="Ab">Ab</option>
                        </Form.Select>
                    </Col>
                </Row>
            
                <Row style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Col>
                        <Form.Check 
                            type="checkbox"
                            id="isTheory"
                            label="isTheory"
                            disabled="true"
                            style= {{float:  "left", marginRight: "10px"}}
                            checked = {props.subject.subject.isTheory}
                        />
                        <Form.Check 
                            type="checkbox"
                            id="isPractical"
                            label="isPractical"
                            disabled="true"
                            style= {{float:  "left"}}
                            checked = {props.subject.subject.isPractical}
                        />
                    </Col>
                </Row>
            </Form>  
        </>
        );
       } 
       else if(props.subject.errMess){
           return(
               <h2>{props.subject.errMess}</h2>
           );
       }
       else {
           return(
                <LoadingComponent />
           );
       }
}

function ShowResult(props){
    const { studentId, resultId, subjectId }  = useParams();
    if(props.auth.isTeacher){
        if (!props.subject.errMess && !props.subject.isLoading) {
            if(props.subject.subject == null)
                props.loadSubjectTeacher(studentId, resultId, subjectId);
            else if(props.subject.subject._id != subjectId)
                props.loadSubjectTeacher(studentId, resultId, subjectId);
        }
    }
    else {
        if (!props.subject.errMess && !props.subject.isLoading) {
            if(props.subject.subject == null)
                props.loadSubjectStudent(resultId, subjectId);
            else if(props.subject.subject._id != subjectId)
                props.loadSubjectStudent(resultId, subjectId);
        }
    }
    
    return(
        <>
            <LoadSubject subject= {props.subject} 
                        editSubject = {props.editSubject} 
                        resultId = {resultId}
                        subjectId = {subjectId}
                        auth = {props.auth}
            />    
        </>
    );
}
export default ShowResult;