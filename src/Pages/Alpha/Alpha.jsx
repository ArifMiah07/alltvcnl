import { Outlet } from "react-router-dom";

const Alpha = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-black text-white text-lg  ">
        {/* <p>this is</p> */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Alpha;
