import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logout, updateUser } from "../actions/userActions";
import { RESET_UPDATE_USER } from "../constants/userConstants";

const Account = () => {
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.loginUser);

  const { userInfo } = loginUser;

  const updateUserStore = useSelector((state) => state.updateUser);

  const {
    loading: updateLoading,
    success,
    error: updateError,
  } = updateUserStore;

  useEffect(() => {
    if (updateLoading) {
      toast.loading("Updating account");
    }

    if (updateError) {
      toast.dismiss();
      toast.error("Error during account updating");
    }

    if (success) {
      toast.dismiss(); // Clear existing toasts
      toast.success("Account updated successfully. You will be logged out."); // New success message
      dispatch(logout());
    }
  }, [updateLoading, updateError, success, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //   useEffect to show messages to user
  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message);
    }
    if (errors.first_name) {
      toast.error(errors.first_name.message);
    }
    if (errors.last_name) {
      toast.error(errors.last_name.message);
    }
    if (errors.email) {
      toast.error(errors.email.message);
    }
  }, [errors.username, errors.first_name, errors.last_name, errors.email]);

  useEffect(() => {
    // Update form field values when they change
    if (userInfo) {
      setValue("user_id", userInfo.user_id);
      setValue("username", userInfo.username);
      setValue("first_name", userInfo.first_name);
      setValue("last_name", userInfo.last_name);
      setValue("email", userInfo.email);
    }
  }, [setValue, userInfo]);

  const onSubmit = (data) => {
    console.log(data);

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

    if (data.current_password) {
      if (data.new_password && data.new_password === data.confirm_password) {
        toast.success("Your password will be updated");
        dispatch(updateUser(data));
        // alert("all good");
      } else {
        toast.error(
          "New password must not be empty and must match confirmed password"
        );
      }
    } else {
      if (!data.new_password && !data.confirm_password) {
        dispatch(updateUser(data));
        // alert("all good");
      } else {
        toast.error(
          "Please introduce your current password in order to update it"
        );
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2" controlId="user_id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                {...register("user_id")}
                readOnly
                type="text"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register("username", {
                  required: "Please introduce a username",
                })}
                type="username"
                placeholder="Enter username"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register("first_name", {
                  required: "Please introduce your first name",
                })}
                type="text"
                placeholder="Enter your first name"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...register("last_name", {
                  required: "Please introduce your last name",
                })}
                type="text"
                placeholder="Enter your last name"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "Please introduce your email",
                })}
                type="email"
                placeholder="Enter your email"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="current_password">
              <Form.Label>Current Password (Optional) </Form.Label>
              <Form.Control
                {...register("current_password")}
                type="password"
                placeholder="Enter your current password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="new_password">
              <Form.Label>New Password (Optional) </Form.Label>
              <Form.Control
                {...register("new_password")}
                type="password"
                placeholder="Enter your new password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="confirm_password">
              <Form.Label>Confirm Password (Optional) </Form.Label>
              <Form.Control
                {...register("confirm_password")}
                type="password"
                placeholder="Confirm your password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image (Optional)</Form.Label>
              <Form.Control {...register("image")} type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
