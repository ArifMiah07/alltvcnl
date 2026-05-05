const RegisterPage = () => {
  return (
    <div className=" w-full min-h-screen z-10 p-4">
      {/* <h1 className=""></h1> */}
      <section className="lg:w-1/3 border border-black bg-">
        <h1 className=" text-3xl font-black text-black text-center my-12  ">
          Sign Up and
          <br /> Play Free
        </h1>
        <form className="flex flex-col gap-6 p-4">
          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            {/* <label htmlFor="username">User Name</label> */}
            <input
              className="w-[90%] text-center p-4 rounded-full border-2 border-black hover:border-[#00ff00] outline-none "
              type="text"
              name="username"
              placeholder="enter a username"
            />
          </div>
          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            {/* <label htmlFor="username">User Name</label> */}
            <input
              className="w-[90%] text-center p-4 rounded-full border-2 border-black hover:border-[#00ff00] outline-none "
              type="password"
              name="password"
              placeholder="enter a password"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-3   rounded-full  p-1">
            <input className=" " type="checkbox" id="scales" name="scales" />
            <label>
              I Accept the{" "}
              <span className="text-[#00fa00ff] ">Privacy Policy</span>
            </label>
          </div>
          <div className="flex flex-col items-center gap-3   rounded-full   p-1">
            <button
              className="w-[90%] text-center p-4 rounded-full border-2 border-black hover:border-[#00ff00] outline-none "
              type="submit">
              Create An Account
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
