import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

// CONSTANTS
const baseUrl = "http://127.0.0.1:8000";

function Home() {
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.loginUser);

  const { loading: userLoading, userInfo, error: userError } = loginUser;

  const [userId, setUserId] = useState("");

  const [username, setUsername] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.user_id);
      setUsername(userInfo.username);
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setEmail(userInfo.email);
      if (userInfo.is_staff) {
        setRole("Lab Director");
      } else {
        setRole("Student Reseacher");
      }
      setImageUrl(userInfo.image);
    }
  }, [loginUser, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="d-flex flex-column align-items-center mt-5">
          <img
            src={`${baseUrl}${imageUrl}`}
            alt="Account"
            width={50}
            height={50}
            className="rounded-circle mb-5"
          />

          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
        <Col md={6}>
          <Form>
            <Form.Group controlId="user_id">
              <Form.Label>ID</Form.Label>
              <Form.Control readOnly type="text" value={userId}></Form.Control>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                readOnly
                type="text"
                value={username}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                readOnly
                type="text"
                value={firstName}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                readOnly
                type="text"
                value={lastName}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control readOnly type="email" value={email}></Form.Control>
            </Form.Group>

            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control readOnly type="text" value={role}></Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
