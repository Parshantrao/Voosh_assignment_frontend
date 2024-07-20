import React, { useContext, useEffect } from 'react'
import { TbNotes } from "react-icons/tb";
import "./Navbar.css"
import { stateContext } from '../../contexts/Context';
import { useNavigate } from 'react-router';

function Navbar() {

  const { loginModalOpen, setLoginModalOpen, showNavBar, setShowNavBar,isUserLoggedin } = useContext(stateContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(window.location.pathname==="/registration"){
      setLoginModalOpen(false)
    }
    else if(window.location.pathname==="/login"){
      setLoginModalOpen(true)
    }
    let flag = ["/login", "/dashboard", "/registration"].includes(window.location.pathname)
    setShowNavBar(flag)
  })
  return (
    showNavBar &&
    <div className='nav-bar_content' >
      <TbNotes className='icons' style={{ color: 'white', height: '40px', fontSize: "40px" }} />
      {!isUserLoggedin?
      <div className='btns'>
        <button id={loginModalOpen ? "selected" : ""} onClick={() => {
          navigate("/login")
        }}>Login</button>
        <button id={loginModalOpen ? "" : "selected"} onClick={() => {
          navigate("/registration")
        }}>Signup</button>
      </div>:
      <p>User logged in</p>}
    </div>
  )
}

export default Navbar