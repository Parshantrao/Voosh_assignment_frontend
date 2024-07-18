import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../stateContext/StateContext';
import Form from 'react-bootstrap/Form';
import "./Style.css"

function AddTask(props) {
  const { cardDetails } = useContext(stateContext)
  return (

    <Modal
      className='add-task-modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={cardDetails?.title} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={cardDetails?.description} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" disabled={true} type="submit">
          Save
        </Button>
        <Button variant='secondary' onClick={props?.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>

  );
}

export default AddTask;