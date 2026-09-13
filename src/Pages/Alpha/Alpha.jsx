import { Outlet } from "react-router-dom";

const Alpha = () => {
  return (
    <>
      <div className="w-full h-full text-lg  ">
        {/* <p>this is</p> */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Alpha;
