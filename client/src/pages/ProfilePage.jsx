import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.auth)

  return (
    <Container>
      <Row className="  justify-content-center mt-5 ">
        <Col
          xs={12}
          md={6}
          className=" card p-5 text-center"
        >
          <h1 className="display-3 mb-3">Welcome {userData.name}</h1>
          <Link to="/updateprofile">
            <Button className=" bg-primary border-primary rounded-pill ">
              Update Profile
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
