import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ superState, logoutUser }) {
  return (
    <>
      <Header superState={superState} logoutUser={logoutUser} />
      <Outlet />
    </>
  );
}

export default Layout;
