import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ClientProfileCreate() {
  const [state, setState] = useState({
    avatar: null,
    first_name: "",
    last_name: "",
  });

  return (
    <>
      <Form>
        <h1>Create Profile</h1>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose a profile picture</Form.Label>
          <Form.Control required type="file" name="avatar" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First name</Form.Label>
          <Form.Control required placeholder="First name..." type="text" name="first_name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last name</Form.Label>
          <Form.Control required placeholder="Last name..." type="text" name="last_name" />
        </Form.Group>

        <div>
          <Button className="form-button" type="submit" variant="dark">
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ClientProfileCreate;
