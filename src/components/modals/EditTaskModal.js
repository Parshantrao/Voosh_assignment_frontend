import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../contexts/Context';
import Form from 'react-bootstrap/Form';
import "./Style.css"

function EditTaskModal() {
  const today = new Date().toISOString().split("T")[0];

  const { cardDetails, fetchAllTasks, setEditModalShow, setCardDetails, editModalShow } = useContext(stateContext)

  const formData = {
    title: "",
    description: "",
    dueDate: ""
  }
  const [editTaskFormData, setEditTaskFormData] = useState({
    ...formData
  })

  const [isTitleChanged, setIsTitleChanged] = useState(false)
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false)
  const [isDateChanged, setIsDateChanged] = useState(false)


  useEffect(() => {
    setEditTaskFormData({ ...cardDetails })
  }, [cardDetails])


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "title":
        value.trim() !== "" && setIsTitleChanged(true);
        break;
      case "description":
        value.trim() !== "" && setIsDescriptionChanged(true);
        break;
      case "dueDate":
        value.trim() !== "" && setIsDateChanged(true);
        break;
      default:
        break;
    }

    setEditTaskFormData({
      ...editTaskFormData,
      [name]: value,
    });
  };

  const isSaveBtnDisabled = () => {
    return Object.keys(formData).every(key => editTaskFormData[key]?.trim() !== "") && (isTitleChanged || isDescriptionChanged || isDateChanged)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fetchedData = await fetch(`http://localhost:3000/tasks/${cardDetails.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editTaskFormData }),
    });
    const data = await fetchedData.json();
    window.alert(data.message);
    fetchAllTasks()
    setIsDateChanged(false)
    setIsTitleChanged(false)
    setIsDescriptionChanged(false)
    setEditModalShow(false)
    setCardDetails([])
  }


  return (

    <Modal
      className='edit-task-modal'
      show={editModalShow}
      onHide={() => {
        setEditModalShow(false)
        setCardDetails([])
        setEditTaskFormData(formData)
        setIsDateChanged(false)
        setIsTitleChanged(false)
        setIsDescriptionChanged(false)
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={handleInputChange} type="text" name='title' value={editTaskFormData.title} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={handleInputChange} type="text" as={"textarea"} name='description' value={editTaskFormData.description} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control onChange={handleInputChange} type="date" min={today} name="dueDate" value={editTaskFormData?.dueDate} />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit} disabled={!isSaveBtnDisabled()} type="submit">
          Save
        </Button>
        <Button variant='secondary' onClick={() => {
          setEditModalShow(false)
          setCardDetails([])
          setEditTaskFormData(formData)
          setIsDateChanged(false)
          setIsTitleChanged(false)
          setIsDescriptionChanged(false)
        }}>Cancel</Button>
      </Modal.Footer>
    </Modal>

  );
}

export default EditTaskModal;