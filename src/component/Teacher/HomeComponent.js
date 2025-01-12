import React from 'react';
import {Card} from 'react-bootstrap';
import {Row } from 'reactstrap';
import {Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingComponent from'../LoadingComponent';

function AddInternshipForm(props) {
  const onFinish = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
          formDataObj = Object.fromEntries(formData.entries())
    props.addbatch(formDataObj);
  };

  const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
  };

  return (
          <Form onSubmit={onFinish}>
            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control required type="text" name="branch"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control required type="number" name="year"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control required type="date" name="from"/>
            </Form.Group>
            <Form.Group>
              <Button type="primary" htmlType="submit" className="login-form-button" style = {{marginTop: "10px"}}>
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
          Add Batch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddInternshipForm addbatch = {props.addbatch}/>
      </Modal.Body>
    </Modal>
  );
}

function Batches({batches, deleteBatch}){
  if(batches.errMess) {
    return(
      <h3>{batches.errMess}</h3>
    );
  }
  else if(batches.batches == null) {
    return(
      <LoadingComponent/>
    );
  }
  else {
    var x = 0;
    return(
      <>
      {
        batches.batches.map((batch) => {
          return(
            <Card className="col-lg-3 offset-lg-1 batchCard" key={batch._id}>
            <Card.Header>Batch {x=x+1}</Card.Header>
            <Card.Body>
                <Card.Title>{batch.branch}{" " + batch.year}</Card.Title>
                <Card.Text>
                    Meetings Count: {batch.meetings.length}<br/>
                    Mentoring From: {batch.year}
                </Card.Text>
                <Button variant="primary" style={{float: "left"}}><Link to={"/teacher/batch/"+batch._id}>View Batch</Link></Button>
                <Button variant="danger" style={{float: "right"}} onClick= {() => deleteBatch(batch._id) }><span className="fa fa-trash fa-lg"></span></Button>
            </Card.Body>
          </Card>
          );
        })
      }
      </>
    );
  }
}

function TeacherHome(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
        <div  className="addButton" style={{marginBottom: "10px"}}>
            <Button variant="success" onClick={() => setModalShow(true)}>
                Add Batch
            </Button>

            <AddInternshipModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                addbatch = {props.addBatch}
            />
        </div>

        <div className="TeacherHome">
            <Row>
              <Batches batches = {props.batches} deleteBatch= {props.deleteBatch}/>
            </Row>
        </div>
        </>
    )
}

export default TeacherHome;
