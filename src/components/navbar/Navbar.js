import React, { useContext, useEffect } from 'react'
import { TbNotes } from "react-icons/tb";
import "./Navbar.css"
import { stateContext } from '../../stateContext/StateContext';
import { useNavigate } from 'react-router';

function Navbar() {

  const { loginModalOpen, setLoginModalOpen, showNavBar, setShowNavBar } = useContext(stateContext)
  const navigate = useNavigate()

  useEffect(() => {
    let flag = ["/login", "/dashboard", "/registration"].includes(window.location.pathname)
    setShowNavBar(flag)
  })
  return (
    showNavBar &&
    <div className='nav-bar_content' >
      <TbNotes className='icons' style={{ color: 'white', height: '40px', fontSize: "40px" }} />
      <div className='btns'>
        <button id={loginModalOpen ? "selected" : ""} onClick={() => {
          setLoginModalOpen(true)
          navigate("/login")
        }}>Login</button>
        <button id={loginModalOpen ? "" : "selected"} onClick={() => {
          navigate("/registration")
          setLoginModalOpen(false)
        }}>Signup</button>
      </div>
    </div>
  )
}

export default Navbar