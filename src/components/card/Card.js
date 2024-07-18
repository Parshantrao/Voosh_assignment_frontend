import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { stateContext } from '../../stateContext/StateContext';
import "./Card.css"

function Cards({ title, description, date, id }) {
    const {setDetailsModalShow,setCardDetails,setEditModalShow} = useContext(stateContext)
    return (
        <Card>
            <Card.Body>
                <Card.Title> {title}</Card.Title>
                <Card.Subtitle>
                    {description}
                </Card.Subtitle>
                <Card.Text>
                    Created at: {date}
                </Card.Text>
                <div className='btns'>
                    <Button variant="danger">Delete</Button>
                    <Button variant="info" onClick={()=>{setEditModalShow(true)
                        setCardDetails({title,description,date,id})
                    }}>Edit</Button>
                    <Button variant="primary" onClick={()=>{setDetailsModalShow(true)
                        setCardDetails({title,description,date,id})
                    }}>View Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Cards;