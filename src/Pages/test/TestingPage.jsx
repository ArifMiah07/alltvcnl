import { useEffect, useState } from "react";

const TestingPage = () => {
  //
  const [showName, setShowName] = useState();
  const [name, setName] = useState(() => {
    const saveName = localStorage.getItem("userName");
    return saveName ? JSON.parse(saveName) : "";
  });
  //
  const [currentPage, setCurrentPage] = useState(() => {
    const storeCurrentPageRangeLocal = localStorage.getItem("currentPage");
    return storeCurrentPageRangeLocal
      ? JSON.parse(storeCurrentPageRangeLocal)
      : "";
  });
  const [currentPageRangeLocal, setCurrentPageRangeLocal] = useState(() => {
    const storeCurrentPageRangeLocal = localStorage.getItem("currentPage");
    return storeCurrentPageRangeLocal
      ? JSON.parse(storeCurrentPageRangeLocal)
      : "";
  });
  //

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(name));
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowName(JSON.parse(localStorage.getItem("userName")));
  };
  console.log(showName);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPageRangeLocal));
  }, [currentPageRangeLocal]);

  const handleCurrentPageSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage")));
  };

  console.log(currentPage);

  return (
    <div className="p-12 flex flex-col gap-4">
      <h1>this is testing page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="name">Enter Your Name - {showName} </label>
        <input
          className="p-3 "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="plz enter ur name"
        />
        <button className="bg-blue-400 p-2" type="submit">
          Submit
        </button>
      </form>
      <form onSubmit={handleCurrentPageSubmit} className="flex flex-col gap-3">
        <label htmlFor="currentPage">Enter Current Page - {currentPage} </label>
        <input
          className="p-3 "
          type="text"
          value={currentPageRangeLocal}
          onChange={(e) => setCurrentPageRangeLocal(e.target.value)}
          placeholder="plz enter current page number"
        />
        <button className="bg-blue-400 p-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestingPage;

/**
 * localStorage.setItem(key, value): Stores a key-value pair. The value must be a string.
 * localStorage.getItem(key): Retrieves the value associated with the given key. Returns null
 * if the key doesn't exist.
 * localStorage.removeItem(key): Removes a specific item based on its key.
 * localStorage.clear(): Removes all key-value pairs for the current domain.
 * localStorage.key(index): Retrieves the key name at a specific index (less commonly used).
 */
