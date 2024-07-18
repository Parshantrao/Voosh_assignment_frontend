import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Row, Col } from 'react-bootstrap'
import Cards from '../../components/card/Card'
import "./Home.css"
import InfoCard from '../../components/modals/InfoModal'
import { stateContext } from '../../stateContext/StateContext'
import EditCard from '../../components/modals/EditTaskModal'
import AddTask from '../../components/modals/AddTaskModal'

function Home() {

  const [searchText, setSearchText] = useState("")
  let cardData = [
    {
      title: "Task 1",
      description: "Description 1",
      date: new Date().toLocaleString()
    },
    {
      title: "Task 2",
      description: "Description 2",
      date: new Date().toLocaleString()
    },
    {
      title: "Task 3",
      description: "Description 3",
      date: new Date().toLocaleString()
    },
    {
      title: "Task 4",
      description: "Description 4",
      date: new Date().toLocaleString()
    },
    {
      title: "Task 5",
      description: "Description 5",
      date: new Date().toLocaleString()
    },
    {
      title: "Task 6",
      description: "Description 6",
      date: new Date().toLocaleString()
    },
  ]
  const [data, setData] = useState([...cardData])

  const { addModalShow, setAddModalShow, detailsModalShow, setDetailsModalShow, editModalShow, setEditModalShow, setCardDetails } = useContext(stateContext)

  useEffect(() => {
    if (searchText.trim() === "") {
      setData([...cardData])
      return
    }
    let arr = cardData.filter(data => data.title.toLowerCase().includes(searchText) || data.description.toLowerCase().includes(searchText) || data.date.includes(searchText));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(arr, searchText)
    setData([...arr])
    // console.log(searchText)
  }, [searchText])

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
              {data.map((data, idx) => {
                return idx <= 2 && <Cards title={data.title} description={data.description} date={data.date} />
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
              {data.map((data, idx) => {
                return idx <= 4 && idx >= 3 && <Cards title={data.title} description={data.description} date={data.date} />
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
              {data.map((data, idx) => {
                return idx >= 5 && <Cards title={data.title} description={data.description} date={data.date} />
              })}
            </div>
          </div>
        </Col>
      </Row>
      <InfoCard show={detailsModalShow}
        onHide={() => {
          setDetailsModalShow(false)
          setCardDetails([])
        }}
      />
      <EditCard
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false)
          setCardDetails([])
        }}
      />
      <AddTask
        show={addModalShow}
        onHide={() => {
          setAddModalShow(false)
          setCardDetails([])
        }}
      />
    </Container>
  )
}

export default Home