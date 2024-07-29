import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Cards from '../../components/card/Card'
import "./Home.css"
import InfoModal from '../../components/modals/InfoModal'
import { stateContext } from '../../contexts/Context'
import EditTaskModal from '../../components/modals/EditTaskModal'
import AddTaskModal from '../../components/modals/AddTaskModal'
import { useNavigate } from 'react-router'
import DeleteTaskModal from '../../components/modals/deleteTaskModal'
import { useDrop } from 'react-dnd'
import { fetchAllTasks } from '../../serverCalls/ServerCalls'

function Home() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")

  const { setAddModalShow, detailsModalShow, setDetailsModalShow, isUserLoggedIn, setCardDetails, tasksData, setTasksData } = useContext(stateContext)

  const [filteredTasksData, setFilteredTasksData] = useState([...tasksData])
  const [sortOption, setSortOption] = useState('sort');

  console.log(process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION)

  // fetch user data
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login")
    }
    else {
      (async function () {
        let userTaks = await fetchAllTasks();

        if (userTaks) {
          setTasksData([...userTaks])
        }
      })()
    }

  }, [isUserLoggedIn, navigate, setTasksData]);



  ///////// ================= DRAG AND DROP ================= /////////////
  const [{ isOverTodo }, dropTodo] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.prevStatus !== 'TODO') {
        changeTaskStatus(item.id, 'TODO');
      }
    },
    collect: (monitor) => ({
      isOverTodo: !!monitor.isOver()
    })
  }));

  const [{ isOverInProgress }, dropInProgress] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.prevStatus !== 'INPROGRESS') {
        changeTaskStatus(item.id, 'INPROGRESS');
      }
    },
    collect: (monitor) => ({
      isOverInProgress: !!monitor.isOver()
    })
  }));

  const [{ isOverDone }, dropDone] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.prevStatus !== 'DONE') {
        changeTaskStatus(item.id, 'DONE');
      }
    },
    collect: (monitor) => ({
      isOverDone: !!monitor.isOver()
    })
  }));

  const changeTaskStatus = async (id, status) => {
    if (status) {
      let fetchedData = await fetch(`${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/tasks/status/${id}`, {
        method: 'PUT',
        credentials: 'include', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: status
        })
      })
      const data = await fetchedData.json();
      window.alert(data.message);
      (async function () {
        let userTaks = await fetchAllTasks();

        if (userTaks) {
          setTasksData([...userTaks])
        }
      })()
    }
  }






  useEffect(() => {
    // Filter and sort tasks based on search text and sort option
    let filteredTasks = [...tasksData];

    if (searchText.trim() !== '') {
      filteredTasks = tasksData.filter(data =>
        data.title.toLowerCase().includes(searchText) ||
        data.description.toLowerCase().includes(searchText) ||
        data.dueDate.split("T")[0].includes(searchText)
      );
    }

    // Sort tasks based on sort option
    switch (sortOption) {
      case 'title_ascending':
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_descending':
        filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'latest':
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'oldest':
        console.log("oooooooooo")
        filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
      default:
        break; // No sorting
    }

    setFilteredTasksData(filteredTasks); // Update tasks data with filtered and sorted tasks
  }, [searchText, sortOption, tasksData]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    // <DndProvider backend={HTML5Backend}>
    <Container className='mt-5 p-0 home-page_container'>
      <div id='add-task_btn'>
        <Button onClick={() => setAddModalShow(true)}>Add Task</Button>
      </div>
      <Row className='search-sort_content'>
        <Col md={6} lg={6} sm={7} xs={12} id='search_content'>
          <b>Search: </b>
          <input onChange={(e) => setSearchText(e.target.value.toLowerCase())} style={{ borderRadius: '5px', border: '1px solid gray', boxShadow: 'none' }} placeholder='Search...' />
        </Col>
        <Col md={6} lg={6} sm={5} xs={12} id='sort_content'>
          <b>Sort By: </b>
          <select name="sort_option" id="sort_option" onChange={handleSortChange}>
            <option value="sort">Sort</option>
            <option value="title_ascending">Title A-Z/a-z</option>
            <option value="title_descending">Title Z-A/z-a</option>
            <option value="latest">Earliest due Date</option>
            <option value="oldest">Latest due date</option>
          </select>
        </Col>
      </Row>
      <Row className='card-container'>
        <Col className='mt-5' md={6} lg={4} sm={12} xs={12}>
          <div className='shadow-box'>
            <div style={{ width: '100%' }}>
              <span className='heading' >TODO</span>
            </div>
            <div className='card-content' ref={dropTodo} style={{ backgroundColor: isOverTodo ? 'lightblue' : 'white' }}>
              {filteredTasksData?.map((data, idx) => {
                return data.status === "TODO" && <Cards key={idx} title={data.title} description={data.description} status={data.status} dueDate={data.dueDate.split("T")[0]} id={data._id} createdAt={data.createdAt} />
              })}
            </div>
          </div>

        </Col>

        <Col className='mt-5' md={6} lg={4} sm={12} xs={12}>
          <div className='shadow-box'>
            <div style={{}}>
              <span
                className='heading' >IN PROGRESS</span>
            </div>
            <div className='card-content' ref={dropInProgress} style={{ backgroundColor: isOverInProgress ? 'lightblue' : 'white' }}>
              {filteredTasksData?.map((data, idx) => {
                return data.status === "INPROGRESS" && <Cards key={idx} title={data.title} description={data.description} status={data.status} dueDate={data.dueDate.split("T")[0]} id={data._id} createdAt={data.createdAt} />
              })}
            </div>
          </div>
        </Col>

        <Col className='mt-5' md={6} lg={4} sm={12} xs={12}>
          <div className='shadow-box'>
            <div style={{ width: '100%' }}>
              <span
                className='heading' >DONE</span>
            </div>
            <div className='card-content' ref={dropDone} style={{ backgroundColor: isOverDone ? 'lightblue' : 'white' }}>
              {filteredTasksData?.map((data, idx) => {
                return data.status === "DONE" && <Cards key={idx} title={data.title} description={data.description} status={data.status} dueDate={data.dueDate.split("T")[0]} id={data._id} createdAt={data.createdAt} />
              })}
            </div>
          </div>
        </Col>
      </Row>
      <InfoModal show={detailsModalShow}
        onHide={() => {
          setDetailsModalShow(false)
          setCardDetails([])
        }}
      />
      <EditTaskModal />
      <AddTaskModal />
      <DeleteTaskModal />
    </Container>
    // </DndProvider>
  )
}

export default Home