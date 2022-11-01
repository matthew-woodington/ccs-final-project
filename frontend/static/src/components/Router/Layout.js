import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ userState, logoutUser }) {
  return (
    <>
      <Header userState={userState} logoutUser={logoutUser} />
      <Outlet />
    </>
  );
}

export default Layout;
