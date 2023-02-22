import React from 'react'
import { Col, Container, Row } from "reactstrap";
import Base from '../components/Base'
import CategorySideMenu from '../components/CategorySideMenu';

function Categories() {
    
  return (
    <Base>
    <Container className="mt-3">
     <Row>
       <Col md={2} className="pt-5">
       <CategorySideMenu/>
       </Col>
       <Col md={10}>
 
       </Col>  
     </Row>
    </Container>
     </Base>
  )
}

export default Categories