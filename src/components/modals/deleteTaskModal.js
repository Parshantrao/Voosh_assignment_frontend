import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../contexts/Context';

function DeleteTaskModal() {
    const {deleteModalShow,setDeleteModalShow,taskId,fetchAllTasks} = useContext(stateContext)

  const handleClose = () => {
    setDeleteModalShow(false)
  };

  const handleDelete = async(e)=>{
    e.preventDefault();

    let fetchedData = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetchedData.json();
    handleClose()
    window.alert(data.message);
    fetchAllTasks()
   
  }
  return (
    <>
      <Modal show={deleteModalShow} onHide={()=>{handleClose()}}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation for delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you really want to delete the task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteTaskModal;