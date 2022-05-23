import React from 'react';
import Header from './Header'
import SidebarBoot from './SidebarBoot'
import LeaveForm from './LeaveForm'
import DisplayLeaves from './DisplayLeaves'
import DisplayEmpLeaves from './DisplayEmpLeaves';
import Footer from './Footer'
import { Card, Container } from 'react-bootstrap';

function Manager() {
  return (
    <>
      <Header />
      <SidebarBoot /> <br />
      <Container className='mb-5'>
        <Card>
          <Card.Body>
            <Card.Title className='mb-3'>ADD LEAVE</Card.Title>
            <LeaveForm />
          </Card.Body>
        </Card>
      </Container>
      <Container className='mb-5'>
        <Card>
          <Card.Body>
            <Card.Title className='mb-3'>YOUR LEAVE HISTORY</Card.Title>
            <DisplayLeaves />
          </Card.Body>
        </Card>
      </Container>
      <Container className='mb-5'>
        <Card>
          <Card.Body>
            <Card.Title className='mb-3'>EMPLOYEE LEAVE HISTORY</Card.Title>
            <DisplayEmpLeaves />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default Manager