import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ userState, logoutUser, requests }) {
  return (
    <>
      <Header userState={userState} logoutUser={logoutUser} requests={requests} />
      <Outlet />
    </>
  );
}

export default Layout;
