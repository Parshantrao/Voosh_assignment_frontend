import React, { useState } from 'react'
import { TbNotes } from "react-icons/tb";
import "./Navbar.css"

function Navbar() {

    const [loginModalOpen,setLoginModalOpen]  = useState(true)

  return (
    <div className='nav-bar_content' >
        <TbNotes className='icons' style={{color:'white',height:'40px', fontSize:"40px"}} />
        <div className='btns'>
            <button id={loginModalOpen?"selected":""} onClick={()=>setLoginModalOpen(true)}>Login</button>
            <button id={loginModalOpen?"":"selected"} onClick={()=>setLoginModalOpen(false)}>Signup</button>
        </div>
    </div>
  )
}

export default Navbar