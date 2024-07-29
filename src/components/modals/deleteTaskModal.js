import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { stateContext } from '../../contexts/Context';
import { fetchAllTasks } from '../../serverCalls/ServerCalls';

function DeleteTaskModal() {
    const {deleteModalShow,setDeleteModalShow,taskId,setTasksData} = useContext(stateContext)

  const handleClose = () => {
    setDeleteModalShow(false)
  };

  const handleDelete = async(e)=>{
    e.preventDefault();

    let fetchedData = await fetch(`${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetchedData.json();
    handleClose()
    window.alert(data.message);
    (async function () {
      let userTaks = await fetchAllTasks();

      if (userTaks) {
        setTasksData([...userTaks])
      }
    })()
   
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