import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { stateContext } from '../../contexts/Context';
import "./Card.css"


function Cards({ title, description, dueDate, id }) {
    const { setDetailsModalShow, setEditModalShow,setCardDetails,setTaskId, setDeleteModalShow } = useContext(stateContext)



    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title> {title}</Card.Title>
                    <Card.Subtitle>
                        {description}
                    </Card.Subtitle>
                    <Card.Text>
                        Created at:<b> {dueDate}</b>
                    </Card.Text>
                    <div className='btns'>
                        <Button variant="danger" onClick={() => {
                            setDeleteModalShow(true)
                            setTaskId(id)
                        }}>Delete</Button>
                        <Button variant="info" onClick={() => {
                            setEditModalShow(true)
                            setCardDetails({ title, description, dueDate, id })
                        }}>Edit</Button>
                        <Button variant="primary" onClick={() => {
                            setDetailsModalShow(true)
                            setCardDetails({ title, description, dueDate, id })
                        }}>View Details</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Cards;