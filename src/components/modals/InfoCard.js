import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../stateContext/StateContext';

function InfoCard( props) {
    let {title,description,date} = props
    const {cardDetails} = useContext(stateContext)
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Title: {cardDetails.title}</p>
                <p>Description: {cardDetails.description}</p>
                <p>Created at: {cardDetails.date}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default InfoCard;