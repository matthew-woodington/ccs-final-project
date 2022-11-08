import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../re-usable-func";
import appLogo from "../../Images/reps-logo.png";

function RegisterForm({ userState, setUserState }) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    is_trainer: false,
    is_client: false,
  });
  const [userType, setUserType] = useState();

  useEffect(() => {
    if (userType === "trainer") {
      setState({
        ...state,
        is_trainer: true,
        is_client: false,
      });
    } else if (userType === "client") {
      setState({
        ...state,
        is_trainer: false,
        is_client: true,
      });
    }
  }, [userType]);

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
      if (userType === "trainer") {
        navigate("/create-trainer-profile");
      } else if (userType === "client") {
        navigate("/create-client-profile");
      }
    }
  };

  return (
    <div className="form-display">
      <Form className="form-box" onSubmit={checkSamePass}>
        <div className="form-head">
          <img className="form-app-logo" src={appLogo} alt="" />
          <h1 className="form-title">Register</h1>
        </div>
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
        <div className="form-footer">
          <Button className="form-button" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
