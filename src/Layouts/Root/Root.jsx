import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { Helmet } from "react-helmet-async";
import { Toaster } from "sonner";

const Root = () => {
  // this is root page
  /**
   * explaining later
   */
  return (
    <div className="relative min-h-screen flex flex-col h-fit w-full mx-auto font-poppins ">
      <Helmet>
        <title>Welcome to iptv player</title>
      </Helmet>
      <Toaster richColors position="top-right" className="fixed z-[9999]" />
      <div
        className="absolute z-0 w-full h-full -top-[60px] left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#A100FF_0%,_#3E1899_45%,_transparent_60%),_radial-gradient(circle_at_70%_35%,_#FF00B2_0%,_#99188C_45%,_transparent_60%),_radial-gradient(circle_at_50%_70%,_#00FFCC_0%,_#189984_45%,_transparent_60%)] blur-[500px] opacity-50 pointer-events-none
  "
      />

      <div className="h-fit z-20 ">
        <NavBar></NavBar>
      </div>
      <div className=" z-10 flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
