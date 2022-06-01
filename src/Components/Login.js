import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import USER from '../USER.json'
import { Button, Card, Container } from 'react-bootstrap'

function Login() {
    // const responseGoogle = (response) => {
    //     if(response.accessToken) {
    //         const email = response.profileObj.email
    //         const name = response.profileObj.name
    //         localStorage.setItem('email', email)
    //         localStorage.setItem('name', name)
    //         if(email === USER.find(user => user.email === email).email) {
    //             localStorage.setItem('role', USER.find(user => user.email === email).role === 'Emp' ? 'Employee' : 'Manager')
    //             window.location.href = USER.find(user => user.email === email).role === 'Emp' ? 'emp' : 'mnger'
    //         } else {
    //             window.location.href = '/'
    //         }
    //     }
    // }

    // const failureGoogle = (response) => {
    //     console.log(response)
    // }

    const navigate = useNavigate()

    const responseClick = (data) => {
      if(data === "employee") {
        localStorage.setItem('role', 'Employee 1')
        navigate('/emp')
      } else if(data === "manager") {
        localStorage.setItem('role', 'Manager 1')
        navigate('/mnger')
      } else {
        localStorage.removeItem('role')
        navigate('/')
      }
    }
        

    return (
        <>
            <Header />
            <Container className='d-flex justify-content-center' style={{marginTop: "15%"}}>
              <Card>
                <Card.Body>
                  <Card.Title>Click on Button to Respective Pages:</Card.Title>
                  {/* <Card.Text className='d-flex justify-content-center'>
                    <GoogleLogin 
                      className='login-button'
                      clientId='437296897984-b2t3vqi88ccs93e88bquct02l6ph53c0.apps.googleusercontent.com'
                      buttonText='Login'
                      onSuccess={responseGoogle}
                      onFailure={failureGoogle}
                      cookiePolicy='single_host_origin'
                    />
                  </Card.Text> */}
                  <Card.Text className='d-flex justify-content-center'>
                    <Button type='submit' onClick={() => responseClick("employee")}>Employee</Button>
                  </Card.Text>
                  <Card.Text className='d-flex justify-content-center'>
                    <Button type='submit' onClick={() => responseClick("manager")}>Manager</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
            <Footer />
        </>
    )
}

export default Login