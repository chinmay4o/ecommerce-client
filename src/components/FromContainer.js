import React from 'react'
import {Row, Col, Container} from "react-bootstrap";

const FromContainer = ({children}) => {
    return (
        <Container>
             <Row className="justify-content-md-center">
                 <Col md={6}>
                     {children}
                 </Col>
             </Row>
        </Container>
    )
}

export default FromContainer
