import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../actions/userActions";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This useEffect is to show messages to the user
  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message);
    }

    if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors.username, errors.password]);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(login(data));
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                {...register("username", {
                  required: "Please introduce your username",
                })}
                type="text"
                placeholder="Enter your username"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                {...register("password", {
                  required: "Please introduce your password",
                })}
                type="password"
                placeholder="Enter your password"
              ></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
