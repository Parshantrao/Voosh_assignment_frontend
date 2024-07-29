import React, { useContext, useEffect } from 'react'
import { TbNotes } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";

import "./Navbar.css"
import { stateContext } from '../../contexts/Context';
import { useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';


function Navbar() {

  const {isUserLoggedIn, loginModalOpen, setLoginModalOpen,setIsUserLoggedIn, showNavBar, setShowNavBar } = useContext(stateContext)
  const navigate = useNavigate()


  const handleLogoutBtnClick = async ()=>{
     
    const response = await fetch(`${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    

    if (response.ok) {
      navigate('/login');
      setIsUserLoggedIn(false)
    } else {
      console.error('Logout failed:', response.statusText);
    }
  }

  useEffect(() => {
    if (window.location.pathname === "/registration") {
      setLoginModalOpen(false)
    }
    else if (window.location.pathname === "/login") {
      setLoginModalOpen(true)
    }
    let flag = ["/login", "/dashboard", "/registration"].includes(window.location.pathname)
    setShowNavBar(flag)
  })


  return (
    showNavBar &&
    <div className='nav-bar_content' >
      <TbNotes className='icons' style={{ color: 'white', height: '40px', fontSize: "40px" }} />
      {!isUserLoggedIn ?
        <div className='btns'>
          <button id={loginModalOpen ? "selected" : ""} onClick={() => {
            navigate("/login")
          }}>Login</button>
          <button id={loginModalOpen ? "" : "selected"} onClick={() => {
            navigate("/registration")
          }}>Signup</button>
        </div> :
        <div className='profile-icon'>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
            >
              <FaRegUserCircle
                style={{
                  color: 'white',
                  height: '40px',
                  fontSize: '40px',
                }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogoutBtnClick}>Logout</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      }
    </div>
  )
}

export default Navbar