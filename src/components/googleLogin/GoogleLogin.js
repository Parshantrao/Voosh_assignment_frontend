

import React from 'react'
import { Button } from 'react-bootstrap'

function GoogleLogin({btnText}) {
    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        window.location.href = `${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/google-login`;
      }
  return (
    <div>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button onClick={handleGoogleLogin}>{btnText} <b>Google</b></Button>
            </div>
    </div>
  )
}

export default GoogleLogin