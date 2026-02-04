// testing local storage more simply :>

import { useEffect, useState } from "react";

const TestLocalStorage = () => {
  // states

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    url: "",
    status: "",
  });
  //   const [userInfoInput, setUserInfoInput] = useState(null);

  // handle
  // submit
  const submitUserInfo = (e) => {
    //
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(userInfo);
  };
  const handleUserInfo = (e) => {
    const { id, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  return (
    <section className="border border-red-400 p-12 w-full min-h-screen">
      {/* hello */}
      <div>
        <form onSubmit={submitUserInfo}>
          <div className="flex flex-col gap-4">
            <label htmlFor="persons_info">Person&apos;s information</label>
            <input
              type="text"
              id="name"
              placeholder="enter person's name"
              value={userInfo.name}
              onChange={handleUserInfo}
            />

            <input
              type="text"
              id="age"
              placeholder="enter person's age"
              value={userInfo.age}
              onChange={handleUserInfo}
            />

            <input
              type="text"
              id="url"
              placeholder="enter person's active presence in the internet"
              value={userInfo.url}
              onChange={handleUserInfo}
            />

            <input
              type="text"
              id="status"
              placeholder="enter person's current status"
              value={userInfo.status}
              onChange={handleUserInfo}
            />
          </div>
          <div className="w-1/2 my-2">
            <button className="p-2 w-full bg-green-500" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TestLocalStorage;
