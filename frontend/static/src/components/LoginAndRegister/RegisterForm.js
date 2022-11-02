import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../re-usable-func";

function RegisterForm({ userState, setUserState }) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [userType, setUserType] = useState();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkSamePass = (e) => {
    if (state.password1 !== state.password2) {
      alert("Please enter matching passwords.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };
    const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      // navigate("/");
      setUserState({ ...userState, auth: true, admin: data.is_superuser, userID: data.id });
      if (userType === "trainer") {
        navigate("/create-trainer-profile");
      } else if (userType === "client") {
        navigate("/create-client-profile");
      }
    }
  };

  return (
    <div>
      <Form onSubmit={checkSamePass}>
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password1"
            value={state.password1}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password2">
          <Form.Control
            type="password"
            placeholder="Enter password again"
            name="password2"
            value={state.password2}
            onChange={handleInput}
          />
        </Form.Group>
        <p>Are you registering as a Trainer or Client?</p>
        <Form.Group className="mb-3" controlId="trainer-check">
          <Form.Check
            required
            type="radio"
            name="user-type"
            value="trainer"
            label="Trainer"
            onChange={(e) => setUserType(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="client-check">
          <Form.Check
            required
            type="radio"
            name="user-type"
            value="client"
            label="Client"
            onChange={(e) => setUserType(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="dark" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
