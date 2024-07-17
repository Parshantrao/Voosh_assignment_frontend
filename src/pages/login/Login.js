import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"

function Login() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'calc(100vh - 50px)'}}>
      <div style={{}}>
        <h1 style={{color:'blue',fontWeight:'700'}}>Login</h1>
        <div style={{border:'2px solid blue',borderRadius:'8px'}} className='px-4 py-3'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
           
            <Button variant="primary" style={{width:'100%'}} type="submit">
              Login
            </Button>

            <div style={{marginTop:'15px'}}>
              <span style={{fontWeight:'600'}}>Don't have an account? <a href='/signup' style={{textDecoration:'none'}}>Signup</a> </span>
            </div>
            <div style={{textAlign:'center',marginTop:'15px'}}>
              <Button>Login with <b>Google</b></Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login