import { Outlet } from "react-router-dom";
import Footer from "../Header/Footer";
import Header from "../Header/Header";

function Layout({ userState, logoutUser, requests }) {
  return (
    <>
      <Header userState={userState} logoutUser={logoutUser} requests={requests} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
