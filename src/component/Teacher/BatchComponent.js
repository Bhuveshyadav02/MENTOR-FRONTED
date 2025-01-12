import React from 'react';
import StudentList from '../Tables/StudentList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MeetingList from '../Tables/MeetingTable';
import LoadingComponent from '../LoadingComponent';
import { useParams } from 'react-router';

function AddStudentForm(props) {
  const onFinish = e => {
    e.preventDefault()
    console.log(props.batchId);
    const formData = new FormData(e.target),
          formDataObj = Object.fromEntries(formData.entries())
          console.log(formDataObj)
    props.addStudent(props.batchId, formDataObj);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onSubmit={onFinish}>
      <Form.Group>
        <Form.Label>Student's Enrollment No.</Form.Label>
        <Form.Control required type="text" name="mentee" placeholder="ex. EN19CS306016" />
        <Form.Text className="text-muted">
          We will show his details
        </Form.Text>
      </Form.Group>
      {/* <Button variant="primary" type="submit">
        Fetch Details
      </Button> */}
      <Form.Group>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "10px" }}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

function AddStudentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddStudentForm addStudent={props.addStudent} batchId = {props.batchId}/>
      </Modal.Body>
    </Modal>
  );
}

function AddMeetingForm(props) {
  const onFinish = e => {
    e.preventDefault()
    console.log(props.batchId);
    const formData = new FormData(e.target),
          formDataObj = Object.fromEntries(formData.entries())
    props.addMeeting(props.batchId, formDataObj);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onSubmit={onFinish}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control required type="date" name="date" placeholder="ex. dd-mm-yy" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Advice</Form.Label>
        <Form.Control required type="text" name="advice" placeholder="Do Some Internships" />
        <Form.Text className="text-muted">
          What advice you have given to mentees
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Attendece</Form.Label>
        <Form.Control required type="number" name="attendence" placeholder="ex. 88.33%" />
        <Form.Text className="text-muted">
          (in %)
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "10px" }}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

function AddMeetingModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Meeting Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddMeetingForm addMeeting={props.addMeeting} batchId = {props.batchId}/>
      </Modal.Body>
    </Modal>
  );
}

function LoadBatch({ batch, deleteMeeting, batchId }) {
  if (batch.batch) {
    return (
      <MeetingList meetings={batch.batch.meetings} deleteMeeting = {deleteMeeting} batchId = {batchId}/>
    );
  }
  else if (batch.errMess) {
    return (
      <h2>{batch.errMess}</h2>
    );
  }
  else {
    return (
      <LoadingComponent />
    );
  }
}

function LoadStudents({ students, deleteStudent }) {
  console.log(students)
  if (students.students) {
    return (
      <StudentList students={students.students} deleteStudent={deleteStudent}/>
    );
  }
  else if (students.errMess) {
    return (
      <h2>{students.errMess}</h2>
    );
  }
  else {
    return (
      <LoadingComponent />
    );
  }
}


function BatchComponent(props) {
  var {batchId } = useParams();
  console.log(props.students)
  if (!props.batch.errMess && !props.batch.isLoading) {
    if(props.batch.batch == null)
      props.loadBatch(batchId);
    else if(props.batch.batch._id != batchId)
      props.loadBatch(batchId);
  }
  // const batchId = props.batch.batch._id;
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);

  return (
    <div className="studentList">
      <div className="addButton">
        <Button variant="success" onClick={() => setModalShow1(true)}>
          Add Student
        </Button>

        <AddStudentModal
          show={modalShow1}
          onHide={() => setModalShow1(false)}
          addStudent={props.addStudent}
          batchId = {batchId}
        />
      </div>
      <div className="studentListTable">
        <LoadStudents students={props.students} deleteStudent={props.deleteStudent}/>
      </div>
      <div className="addButton">
        <Button variant="success" onClick={() => setModalShow2(true)}>
          Add Meeting
        </Button>

        <AddMeetingModal
          show={modalShow2}
          onHide={() => setModalShow2(false)}
          addMeeting={props.addMeeting}
          batchId = {batchId}
        />
      </div>
      <div className="studentListTable">
        <LoadBatch batch={props.batch} deleteMeeting = {props.deleteMeeting} batchId = {batchId}/>
      </div>
    </div>
  )
}

export default BatchComponent;
