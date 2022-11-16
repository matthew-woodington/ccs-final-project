import "../../styles/Form.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleError } from "../../re-usable-func";
import { useNavigate, Link } from "react-router-dom";
import appLogo from "../../Images/reps-logo.png";
import { BiErrorAlt } from "react-icons/bi";

function LoginForm({ userState, setUserState }) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();

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

    const data = await response.json();
    if (!response.ok) {
      setError(data);
      throw new Error("Network response was not OK");
    } else {
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/");
      setUserState({
        ...userState,
        auth: true,
        admin: data.is_superuser,
        userID: data.id,
        is_trainer: data.is_trainer,
        is_client: data.is_client,
        trainer_avatar: data.trainer_avatar,
        client_avatar: data.client_avatar,
        trainer_profile: data.trainer_profile,
        client_profile: data.client_profile,
      });
    }
  };

  return (
    <div className="form-display">
      <Form className="form-box" onSubmit={handleSubmit}>
        <div className="form-head">
          <img className="form-app-logo" src={appLogo} alt="" onClick={() => navigate("/")} />
          <h1 className="form-title">Login</h1>
        </div>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            name="password"
            value={state.password}
            onChange={handleInput}
          />
        </Form.Group>
        {error &&
          error?.non_field_errors?.map((error) => (
            <p className="error-message">
              <BiErrorAlt className="error-icon" />
              {error}
            </p>
          ))}
        <div className="form-footer">
          <Button className="form-button login-button bottom-button" type="submit">
            Login
          </Button>
          <p>
            Don't have an account? Click{" "}
            <Link className="register-link" to={"/register"}>
              here
            </Link>{" "}
            to create one.
          </p>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
