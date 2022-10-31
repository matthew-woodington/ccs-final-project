import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleError } from "../../re-usable-func";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ superState, setSuperState }) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      console.log(data);
      navigate("/");
      setSuperState({
        ...superState,
        auth: true,
        admin: data.is_superuser,
        userID: data.id,
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={state.password}
            onChange={handleInput}
          />
        </Form.Group>
        <div>
          <Button variant="dark" type="submit">
            Login
          </Button>
          <p>
            Don't have an account? Click <Link to={"/register"}>here</Link> to create one.
          </p>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
