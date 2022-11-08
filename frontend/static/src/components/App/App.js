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
import TrainerDetailView from "../Home/ProfileDetail/TrainerDetailView";
import TrainerMyProfile from "../Profiles/TrainerMyProfile";
import TrainerPortal from "../TrainerPortal/TrainerPortal";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
  is_trainer: false,
  is_client: false,
  trainer_avatar: null,
  client_avatar: null,
  trainer_profile: null,
};

function App() {
  const [userState, setUserState] = useState(INITIAL_STATE);
  const [requests, setRequests] = useState();

  const newState = JSON.parse(window.localStorage.getItem("userState"));

  useEffect(() => {
    window.localStorage.setItem("userState", JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
        // setUserState(INITIAL_STATE);
      } else {
        setUserState(newState);
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
      window.localStorage.removeItem("userState");
      setUserState(INITIAL_STATE);
    }
  };

  useEffect(() => {
    console.count("effect");
    const getRequests = async () => {
      const response = await fetch(`/api/v1/requests/trainer/${userState.trainer_profile}/`).catch(
        handleError
      );
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setRequests(data);
    };

    getRequests();
  }, [userState.trainer_profile]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout userState={userState} logoutUser={logoutUser} requests={requests} />}
          >
            <Route index element={<Home />} />
            <Route path="trainer/:id/*" element={<TrainerDetailView userState={userState} />} />
            <Route
              path="create-trainer-profile"
              element={<TrainerProfileCreate userState={userState} setUserState={setUserState} />}
            />
            <Route
              path="create-client-profile"
              element={<ClientProfileCreate userState={userState} setUserState={setUserState} />}
            />
            <Route path="trainer/my-profile" element={<TrainerMyProfile userState={userState} />} />
            <Route
              path="trainer/portal"
              element={
                <TrainerPortal
                  userState={userState}
                  requests={requests}
                  setRequests={setRequests}
                />
              }
            />
          </Route>
          <Route
            path="login"
            element={<LoginForm userState={userState} setUserState={setUserState} />}
          />
          <Route
            path="register"
            element={<RegisterForm userState={userState} setUserState={setUserState} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
