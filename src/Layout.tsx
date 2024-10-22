import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar"; // Adjust the import path as needed

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
