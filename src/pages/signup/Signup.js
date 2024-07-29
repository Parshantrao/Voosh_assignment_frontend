import React, { useContext, useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { stateContext } from '../../contexts/Context';
import GoogleLogin from '../../components/googleLogin/GoogleLogin';

function Signup() {

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const formData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repassword: ""
  }

  const [signupFormData, setSignupFormData] = useState(formData)

  const [signupBtnClicked, setSignupBtnClicked] = useState(false)

  const { setUserEmail,isUserLoggedIn } = useContext(stateContext)
  
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setSignupFormData({ ...signupFormData, email: e.target.value });
    const emailElement = document.querySelector("input[name=email]")
    if (emailRegex.test(emailElement.value)) {
      emailElement.setCustomValidity("")
    }
    else {
      emailElement.setCustomValidity("Please enter a valid email")
    }
  };


  const onChangePasswordVal = (value) => {
    const passwordVal = document.querySelector("input[name=password]");
    const rePasword = document.querySelector("input[name=re-password]");
    if (rePasword.value === passwordVal.value) {
      rePasword.setCustomValidity("");
    } else {
      rePasword.setCustomValidity("Password should match");
    }
  };

  const handleSubmit = async (e) => {
    setSignupBtnClicked(true)
    e.preventDefault();
    setUserEmail(signupFormData.email)

    let fetchedData = await fetch(`${process.env.BACKEND_DEPLOYED_UR}L/users`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...signupFormData })
    })

    let jsonData = await fetchedData.json()
    
    if (!jsonData.status) {
      window.alert(jsonData.message)
    }
    else {
      window.alert(jsonData.message)
      setSignupFormData(formData)
      setTimeout(() => {
        navigate("/login")
      }, 700);
    }
    setSignupBtnClicked(false)
  }

  useEffect(() => {

    if (isUserLoggedIn) {
      navigate('/dashboard');
    }

  }, [isUserLoggedIn,navigate])


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{}}>
        <h1 style={{ color: 'blue', fontWeight: '700' }}>Signup</h1>
        <div style={{ border: '2px solid blue', borderRadius: '8px' }} className='px-4 py-3'>
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control required value={signupFormData.first_name} onChange={(e) => {
                setSignupFormData({ ...signupFormData, first_name: e.target.value })
              }} type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Control required value={signupFormData.last_name} onChange={(e) => {
                setSignupFormData({ ...signupFormData, last_name: e.target.value })
              }} type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control required value={signupFormData.email} onChange={handleEmailChange} type="email" name='email' placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control required name='password' value={signupFormData.password} onChange={(e) => {
                onChangePasswordVal();
                setSignupFormData({ ...signupFormData, password: e.target.value })

              }} type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword">
              <Form.Control value={signupFormData.repassword} required name='re-password' onChange={(e) => {
                onChangePasswordVal()
                setSignupFormData({ ...signupFormData, repassword: e.target.value })
              }} type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button disabled={signupBtnClicked} variant="primary" style={{ width: '100%' }} type="submit">
              Signup
            </Button>

            <div style={{ marginTop: '15px' }}>
              <span style={{ fontWeight: '600' }}>Already have an account? <span onClick={() => {
                navigate("/login")
              }} style={{ textDecoration: 'none', cursor: 'pointer', color: 'blue' }}>Login</span> </span>
            </div>
           <GoogleLogin btnText="Signup with" />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup