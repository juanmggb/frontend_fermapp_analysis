import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../actions/userActions";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-hot-toast";

function Users() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  const { error, users: usersStore, loading } = userList;

  const [users, setUsers] = useState();

  useEffect(() => {
    if (loading) {
      // Loading toast (useful for async operations)
      toast.loading("Loading Users");
    }

    if (error) {
      toast.dismiss();
      toast.error("Error during users request");
    }

    if (usersStore) {
      toast.remove();
    }
  }, [error, loading, usersStore]);

  useEffect(() => {
    if (usersStore) {
      setUsers(usersStore);
    } else {
      dispatch(getUserList());
    }
  }, [usersStore, dispatch]);

  return (
    <>
      <h1>Users</h1>
      {users ? (
        <Container>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IMAGE</th>
                    <th>USERNAME</th>
                    <th>NAME</th>
                    <th>ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <img
                          width="50px"
                          height="50px"
                          src={`http://127.0.0.1:8000${user.member.image}`}
                          alt="{user.username}"
                        />
                      </td>
                      <td>{user.username}</td>
                      <td>
                        {user.first_name} {user.last_name}
                      </td>
                      <td>{user.member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1>No users</h1>
      )}
    </>
  );
}

export default Users;
