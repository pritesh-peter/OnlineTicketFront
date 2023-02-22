import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Base from '../components/Base'
import CategorySideMenu from '../components/CategorySideMenu'

function Error() {
  return (
    <Base>
    <Container className="mt-3">
        <div>
     <Row>
        <h1 style={{color: "red"}}>404 NOT FOUND</h1>
     </Row>
     </div>
    </Container>

     </Base>  )
}

export default Error