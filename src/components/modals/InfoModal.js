import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../contexts/Context';
import "./Style.css"

function InfoModal( props) {
    const {cardDetails} = useContext(stateContext)
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='info-modal'
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p id='title'>Title: {cardDetails.title}</p>
                <p id='description'>Description: {cardDetails.description}</p>
                <p id='date'>Created at: {cardDetails.dueDate}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default InfoModal;