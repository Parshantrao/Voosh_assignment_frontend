import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { stateContext } from '../../contexts/Context';
import "./Card.css"
import { useDrag } from "react-dnd"

function Cards({ title, description, dueDate, id, status, createdAt }) {
    const { setDetailsModalShow, setEditModalShow, setCardDetails, setTaskId, setDeleteModalShow } = useContext(stateContext)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { "id": id, prevStatus: status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return (
        <div>
            <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <Card.Body>
                    <Card.Title> {title}</Card.Title>
                    <Card.Subtitle>
                        {description}
                    </Card.Subtitle>
                    <Card.Text>
                        Created at:<b> {createdAt.split("T")[0]}</b>
                    </Card.Text>
                    <Card.Text>
                        Due Date:<b> {dueDate}</b>
                    </Card.Text>
                    <div className='btns'>
                        <Button variant="danger" onClick={() => {
                            setDeleteModalShow(true)
                            setTaskId(id)
                        }}>Delete</Button>
                        <Button variant="info" onClick={() => {
                            setEditModalShow(true)
                            setCardDetails({ title, description, dueDate, id, createdAt })
                        }}>Edit</Button>
                        <Button variant="primary" onClick={() => {
                            setDetailsModalShow(true)
                            setCardDetails({ title, description, dueDate, id, createdAt })
                        }}>View Details</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Cards;