const RegisterPage = () => {
  return (
    <div className="bg-black/40">
      <h1 className="">This is Register page</h1>
      <section className="w-full bg-">
        <form>
          <div>
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" placeholder="user name" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
