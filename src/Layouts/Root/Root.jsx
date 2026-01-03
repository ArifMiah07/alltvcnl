import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { Helmet } from "react-helmet-async";

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
      {/* <div
        className=" absolute z-1 top-24 left-40 w-[900px] h-[900px] rounded-full    bg-[radial-gradient(circle,_#A100FF_0%,_#3E1899_100%)] blur-[480px]  opacity-10
    pointer-events-none ">

      </div>
      <div
        className=" absolute z-2 top-24 right-40 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,_#FF00B2_100%,_#99188C_100%)] blur-[480px] opacity-10
    pointer-events-none ">

      </div>
      <div className=" absolute z-3 top-96 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,_#00FFCC_100%,_#189984_100%)] blur-[480px]  opacity-10 pointer-events-none ">

      </div> */}
      <div
        className="absolute z-4 w-full h-full -top-[60px] left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#A100FF_0%,_#3E1899_45%,_transparent_60%),_radial-gradient(circle_at_70%_35%,_#FF00B2_0%,_#99188C_45%,_transparent_60%),_radial-gradient(circle_at_50%_70%,_#00FFCC_0%,_#189984_45%,_transparent_60%)] blur-[500px] opacity-50 pointer-events-none
  "
      />

      <div className="h-fit z-11 ">
        <NavBar></NavBar>
      </div>
      <div className=" z-10 flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
