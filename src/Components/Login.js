import React from 'react'
import Header from './Header'
import Footer from './Footer'
import GoogleLogin from 'react-google-login'
import USER from '../USER.json'
import { Card, Container } from 'react-bootstrap'

function Login() {
    const responseGoogle = (response) => {
        if(response.accessToken) {
            const email = response.profileObj.email
            const name = response.profileObj.name
            localStorage.setItem('email', email)
            localStorage.setItem('name', name)
            if(email === USER.find(user => user.email === email).email) {
                localStorage.setItem('role', USER.find(user => user.email === email).role === 'Emp' ? 'Employee' : 'Manager')
                window.location.href = USER.find(user => user.email === email).role === 'Emp' ? 'emp' : 'mnger'
            } else {
                window.location.href = '/'
            }
        }
    }

    const failureGoogle = (response) => {
        console.log(response)
    }

    return (
        <>
            <Header />
            <Container className='d-flex justify-content-center' style={{marginTop: "15%"}}>
              <Card>
                <Card.Body>
                  <Card.Title>Login with Google Account</Card.Title>
                  <Card.Text className='d-flex justify-content-center'>
                    <GoogleLogin 
                      className='login-button'
                      clientId='437296897984-b2t3vqi88ccs93e88bquct02l6ph53c0.apps.googleusercontent.com'
                      buttonText='Login'
                      onSuccess={responseGoogle}
                      onFailure={failureGoogle}
                      cookiePolicy='single_host_origin'
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
            <Footer />
        </>
    )
}

export default Login