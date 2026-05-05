import { Link } from "react-router-dom";
import google_img from "../../../assets/images/google.png";

const RegisterPage = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center z-10 p-4 auth_page_background">
      {/* <h1 className=""></h1> */}
      <section className="lg:w-1/3 bg-white border border-black bg-">
        <h1 className=" text-3xl font-black text-black text-center my-12  ">
          Sign Up and
          <br /> Play Free
        </h1>
        <form className="flex flex-col gap-6 p-4">
          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            {/* <label htmlFor="username">User Name</label> */}
            <input
              className="w-[90%] text-lg text-center p-4 rounded-full border-2 border-black hover:border-[#00ff00] outline-none "
              type="text"
              name="username"
              // required
              placeholder="User Name"
            />
          </div>
          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            {/* <label htmlFor="username">User Name</label> */}
            <input
              className="w-[90%] text-lg text-center p-4 rounded-full border-2 border-black hover:border-[#00ff00] outline-none "
              // required
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {/*  */}
          <div className="flex flex-row items-center justify-center gap-3   rounded-full  p-1">
            <input className=" " type="checkbox" id="scales" name="scales" />
            <label>
              I Accept the{" "}
              <span className="text-[#00af00ff] font-bold">Privacy Policy</span>
            </label>
          </div>
          {/*  */}
          <div className="flex flex-row items-center justify-center gap-3   rounded-full  p-1">
            <input className=" " type="checkbox" id="scales" name="scales" />
            <label>
              I understand this account cannot <br /> be recovered without
              adding an email{" "}
              {/* <span className="text-[#00af00ff] font-bold">Privacy Policy</span> */}
            </label>
          </div>

          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            <button
              className="relative w-[90%] text-white text-lg font-bold uppercase text-center p-4 rounded-full create_account_button"
              type="submit">
              Create An Account
              <span className="absolute top-0 left-0 w-[100px] h-[40px] rounded-full bg-[#ffffff23] ">
                <div className="relative  ">
                  <span className="absolute top-3 left-4 w-[14px] h-[20px] rotate-[45deg] rounded-full bg-[#fffffffa]  "></span>
                  <span className="absolute  top-1 left-8  w-[7px] h-[7px] rotate-[45deg] rounded-full bg-[#ffffffff]  "></span>
                </div>
              </span>
              <span className="absolute bottom-0 right-5 w-[70px] h-[20px] rounded-l-md bg-[#ffffff23] "></span>
              <span className="absolute top-0 right-0 w-[20px] h-[60px] rounded-l-lg  bg-[#ffffff23] "></span>
            </button>
            <button
              className="relative w-[90%] text-center p-4 rounded-full continue_with_google_button"
              type="submit">
              <span className="flex flex-row gap-4 items-center justify-center w-full h-full">
                <img
                  className="w-[16px] h-[16px] "
                  src={google_img}
                  alt="google logo"
                />
                <p className="text-lg text-white font-bold uppercase ">
                  Continue With Google
                </p>
              </span>
              <span className="absolute top-0 left-0 w-[100px] h-[40px] rounded-full bg-[#ffffff23] ">
                <div className="relative  ">
                  <span className="absolute top-3 left-4 w-[14px] h-[20px] rotate-[45deg] rounded-full bg-[#fffffffa]  "></span>
                  <span className="absolute  top-1 left-8  w-[7px] h-[7px] rotate-[45deg] rounded-full bg-[#ffffffff]  "></span>
                </div>
              </span>
              <span className="absolute bottom-0 right-5 w-[70px] h-[20px] rounded-l-md bg-[#ffffff23] "></span>
              <span className="absolute top-0 right-0 w-[20px] h-[60px] rounded-l-lg  bg-[#ffffff23] "></span>
            </button>
          </div>
          {/*  */}
          <div className="flex flex-row items-center justify-center gap-3   rounded-full  p-1">
            {/* <input className=" " type="checkbox" id="scales" name="scales" /> */}
            <label>
              Already Have an Account?{" "}
              <span className="text-[#00af00ff] font-bold">
                <Link to={"/auth/login"}>Log In</Link>
              </span>
            </label>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
