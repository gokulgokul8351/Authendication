import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="  justify-content-center mt-5 ">
          <Col
            xs={12}
            md={6}
            className=" card p-5 text-center"
          >
            <p className="display-6 mb-4"> Oops! something went wrong </p>
            <p className="">
              {' '}
              The page you requested was not found - 404 Error{' '}
            </p>
            <Link to="/">Go back</Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ErrorPage
