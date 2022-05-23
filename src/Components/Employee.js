import React from 'react';
import Header from './Header'
import LeaveForm from './LeaveForm';
import DisplayLeaves from './DisplayLeaves'
import Footer from './Footer'
import SidebarBoot from './SidebarBoot';
import { Card, Container } from 'react-bootstrap';

function Employee() {
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
      <Container>
        <Card>
          <Card.Body>
            <Card.Title className='mb-3'>LEAVE HISTORY</Card.Title>
            <DisplayLeaves />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default Employee