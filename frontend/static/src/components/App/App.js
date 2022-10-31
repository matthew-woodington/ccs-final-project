import "../../styles/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Router/Layout";
import LoginForm from "../LoginAndRegister/LoginForm";
import Home from "../Home/Home";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
};

function App() {
  const [superState, setSuperState] = useState(INITIAL_STATE);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={<LoginForm superState={superState} setSuperState={setSuperState} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
