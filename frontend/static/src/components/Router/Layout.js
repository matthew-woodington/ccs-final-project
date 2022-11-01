import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ appState, logoutUser }) {
  return (
    <>
      <Header appState={appState} logoutUser={logoutUser} />
      <Outlet />
    </>
  );
}

export default Layout;
