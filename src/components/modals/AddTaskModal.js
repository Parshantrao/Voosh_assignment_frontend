import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { stateContext } from "../../contexts/Context";
import Form from "react-bootstrap/Form";
import "./Style.css";

function AddTaskModal() {
  const formData = {
    title: "",
    description: "",
    dueDate: "",
  };


  const { fetchAllTasks,addModalShow,setAddModalShow,setCardDetails } = useContext(stateContext);

  const [newTaskFormData, setNewTaskFormData] = useState(formData);

  const today = new Date().toISOString().split("T")[0];

  const isSaveButtonDisabled = () => {
    return !Object.keys(formData).every(
      (key) => newTaskFormData[key].trim() !== ""
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTaskFormData({
      ...newTaskFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("userId")
    
    let fetchedData = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTaskFormData, userId: userId }),
    });
    const data = await fetchedData.json();
    fetchAllTasks()
    window.alert(data.message);
    setNewTaskFormData(formData)
  };

  return (
    <Modal
      className="add-task-modal"
      show={addModalShow}
      onHide={()=>{
        setAddModalShow(false)
        setCardDetails([])
        setNewTaskFormData(formData)
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={newTaskFormData.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              as={"textarea"}
              value={newTaskFormData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              min={today}
              value={newTaskFormData.dueDate}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={isSaveButtonDisabled()}
          onClick={handleSubmit}
          type="submit"
        >
          Save
        </Button>
        <Button variant="secondary" onClick={()=>{
           setAddModalShow(false)
           setCardDetails([])
          setNewTaskFormData(formData)
        }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
