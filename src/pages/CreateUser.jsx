import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { RESET_CREATE_USER } from "../constants/userConstants";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUserStore = useSelector((state) => state.createUser);

  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = createUserStore;

  useEffect(() => {
    if (createLoading) {
      toast.loading("Creating member");
    }

    if (createError) {
      toast.dismiss();
      toast.error("Error during member creation");
    }
    if (createSuccess) {
      toast.remove();
      dispatch({ type: RESET_CREATE_USER });
      navigate("/users");
    }
  }, [dispatch, createSuccess, createError, createLoading, navigate]);

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

    if (errors.password2) {
      toast.error(errors.password2.message);
    }
  }, [errors.username, errors.password, errors.password2]);

  const onSubmit = (data) => {
    if (data["password"] !== data["password2"]) {
      toast.error("Passwords must match");
    } else {
      const formData = new FormData();

      for (const key in data) {
        if (key === "image") {
          const fileList = data[key];
          const file = fileList[0]; // Assuming you only allow a single file upload
          if (file !== undefined) {
            formData.append(key, file);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      dispatch(createUser(formData));
    }
  };

  return (
    <>
      <div>Create Member</div>
      <Container>
        <Row>
          <Col xs={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select {...register("role")}>
                  <option value="Lab Director">Lab Director</option>
                  <option value="Student Researcher">Student Researcher</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password", {
                    required: "A Password is required ",
                  })}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  {...register("password2", {
                    required: "Please confirm your password",
                  })}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name (Optional)</Form.Label>
                <Form.Control
                  {...register("first_name")}
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name (Optional)</Form.Label>
                <Form.Control
                  {...register("last_name")}
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>

              <Form.Group className="mb" controlId="email">
                <Form.Label>Email (Optional)</Form.Label>
                <Form.Control
                  {...register("email")}
                  type="email"
                  placeholder="Enter Email"
                ></Form.Control>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* Existing form fields... */}
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image (Optional)</Form.Label>
                <Form.Control {...register("image")} type="file" />
              </Form.Group>
              {/* Submit button */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
