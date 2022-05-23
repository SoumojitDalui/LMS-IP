import React from 'react'
import { Card, Container } from 'react-bootstrap'
import DisplayIndLeaves from './DisplayIndLeaves'
import Footer from './Footer'
import Header from './Header'
import SidebarBoot from './SidebarBoot'

function LeavesOfIndividual() {
  return (
      <>
        <Header />
        <SidebarBoot />
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className='mb-3'>{localStorage.getItem('nav')}'s Leave History</Card.Title>
              <DisplayIndLeaves />
            </Card.Body>
          </Card>
        </Container>
        <Footer />
      </>
  )
}

export default LeavesOfIndividual