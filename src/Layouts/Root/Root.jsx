import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { Helmet } from "react-helmet-async";

const Root = () => {
  // this is root page
  /**
   * explaining later
   */
  return (
    <div className=" min-h-screen flex flex-col h-fit w-full mx-auto font-poppins ">
      <Helmet>
        <title>Welcome to iptv player</title>
      </Helmet>
      <div className=" h-fit ">
        <NavBar></NavBar>
      </div>
      <div className="  flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
