import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{}}>
        <h1 style={{ color: 'blue', fontWeight: '700' }}>Signup</h1>
        <div style={{ border: '2px solid blue', borderRadius: '8px' }} className='px-4 py-3'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" style={{ width: '100%' }} type="submit">
              Signup
            </Button>

            <div style={{ marginTop: '15px' }}>
              <span style={{ fontWeight: '600' }}>Already have an account? <a href='/login' style={{ textDecoration: 'none' }}>Login</a> </span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button>Signup with <b>Google</b></Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup