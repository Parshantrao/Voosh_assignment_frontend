import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Row, Col } from 'react-bootstrap'
import Cards from '../../components/card/Card'
import "./Home.css"
import InfoModal from '../../components/modals/InfoModal'
import { stateContext } from '../../contexts/Context'
import EditTaskModal from '../../components/modals/EditTaskModal'
import AddTaskModal from '../../components/modals/AddTaskModal'
import { useNavigate } from 'react-router'
import DeleteTaskModal from '../../components/modals/deleteTaskModal'

function Home() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")

  const { addModalShow, setAddModalShow, detailsModalShow, setDetailsModalShow, editModalShow, setEditModalShow, setCardDetails, tasksData, fetchAllTasks, checkForTokenValidation } = useContext(stateContext)



  useEffect(() => {
    const checkUserAuth = async () => {
      const isTokenValid = await checkForTokenValidation()
      if (!localStorage.getItem("userId") || !isTokenValid) {
        navigate("/login")
      }
      else {
        fetchAllTasks()
      }
    }
    checkUserAuth()
  }, [])




  // get all tasks
  // useEffect(() => {

  // }, [])

  // useEffect(() => {
  //   if (searchText.trim() === "") {
  //     setTasksData([...cardData])
  //     return
  //   }
  //   let arr = cardData.filter(data => data.title.toLowerCase().includes(searchText) || data.description.toLowerCase().includes(searchText) || data.dueDate.split("T")[0].includes(searchText));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   setTasksData([...arr])
  //   // console.log(searchText)
  // }, [searchText])

  return (
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
          <select name="sort_option" id="sort_option">
            <option value="recent">Recent</option>
            <option value="title_ascending">Title A-Z/a-z</option>
            <option value="title_descending">Title Z-A/z-a</option>
          </select>
        </Col>
      </Row>
      <Row className='card-container'>
        <Col className='mt-5' md={6} lg={4} sm={12} xs={12}>
          <div className='shadow-box'>
            <div style={{ width: '100%' }}>
              <span className='heading' >TODO</span>
            </div>
            <div className='card-content'>
              {tasksData.map((data, idx) => {
                return data.status === "TODO" && <Cards key={idx} title={data.title} description={data.description} dueDate={data.dueDate.split("T")[0]} id={data._id} />
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
            <div className='card-content'>
              {tasksData.map((data, idx) => {
                return data.status === "INPROGRESS" && <Cards key={idx} title={data.title} description={data.description} dueDate={data.dueDate.split("T")[0]} id={data._id} />
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
            <div className='card-content'>
              {tasksData.map((data, idx) => {
                return data.status === "DONE" && <Cards key={idx} title={data.title} description={data.description} dueDate={data.dueDate.split("T")[0]} id={data._id} />
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
  )
}

export default Home