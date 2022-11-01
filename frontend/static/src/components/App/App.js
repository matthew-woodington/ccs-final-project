import "../../styles/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Router/Layout";
import LoginForm from "../LoginAndRegister/LoginForm";
import Home from "../Home/Home";
import RegisterForm from "../LoginAndRegister/RegisterForm";
import Cookies from "js-cookie";
import { handleError } from "../../re-usable-func";
import TrainerProfileCreate from "../Profiles/TrainerProfileCreate";
import ClientProfileCreate from "../Profiles/ClientProfileCreate";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
};

function App() {
  const [appState, setAppState] = useState(INITIAL_STATE);

  const newState = JSON.parse(window.localStorage.getItem("superState"));

  useEffect(() => {
    window.localStorage.setItem("superState", JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
        // setAppState(INITIAL_STATE);
      } else {
        setAppState(newState);
      }
    };
    checkAuth();
  }, []);

  const logoutUser = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      Cookies.remove("Authorization");
      window.localStorage.removeItem("superState");
      setAppState(INITIAL_STATE);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout appState={appState} logoutUser={logoutUser} />}>
            <Route index element={<Home />} />
            <Route path="create-trainer-profile" element={<TrainerProfileCreate />} />
            <Route path="create-client-profile" element={<ClientProfileCreate />} />
          </Route>
          <Route
            path="login"
            element={<LoginForm appState={appState} setAppState={setAppState} />}
          />
          <Route
            path="register"
            element={<RegisterForm appState={appState} setAppState={setAppState} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
