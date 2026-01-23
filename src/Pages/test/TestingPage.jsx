import axios from "axios";
import { useEffect, useState } from "react";

const TestingPage = () => {
  //
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchValue, setShowSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchValueInputRange, setSearchValueInputRange] = useState("");
  //
  //   const getLocalItem = localStorage.getItem("searchValueLocal");
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log();
    handleSearchValue(searchValueInputRange);
    // localStorage.getItem("searchValueLocal", JSON.parse(searchValueInputRange));
  };
  const handleSearchValue = (value) => {
    localStorage.setItem("searchValueLocal", JSON.stringify(value));
    setSearchValue(value);
  };
  useEffect(() => {
    const stored = localStorage.getItem("searchValueLocal");
    setShowSearchValue(stored);
    if (stored) {
      console.log("Stored value:", JSON.parse(stored));
    }
  }, [searchValue]);
  //   console.log("stored ", showSearchValue);

  //   const getItem = localStorage.getItem("searchValueLocal");
  //   console.log("search: value:: ", searchValue, JSON.parse(getItem));

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const searchTerm = JSON.parse(showSearchValue);
        const url = `http://localhost:5000/api/iptv-player/testing-search-url?term=${searchTerm}`;
        const response = await axios.get(url);
        // console.log(response?.data);
        setSearchData(response?.data?.data);
        setError(null);

        //
      } catch (error) {
        // throw new Error("Something went wrong! ");
        setError(error);
      } finally {
        //
        setLoading(false);
      }
    };
    fetchSearchResult();
  }, [searchValue, showSearchValue]);

  console.log(searchData);

  //   const s = JSON.parse(showSearchValue);
  console.log("searchValue, showSearchValue", showSearchValue);
  //   console.log("searchValueInputRange ", searchValueInputRange);

  return (
    // this is search page
    /**
     * Search by channel, title and show all search results with
     * pagination and add a sidebar for filtering and control user actions
     * refactor, add all device responsiveness
     */
    <div className="p-2 flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex gap-3" htmlFor="name">
          <h1 className=" ">Search</h1>
          <h2> {">"}</h2>
          {searchValueInputRange === "" ? (
            "search for "
          ) : (
            <> Searching for {searchValueInputRange} </>
          )}
        </label>
        <div className="flex items-center ">
          <input
            className=" px-3 py-1 w-full md:w-1/3 border rounded-l-lg  "
            type="text"
            value={searchValueInputRange}
            onChange={(e) => setSearchValueInputRange(e.target.value)}
            placeholder="search by channel, title"
          />
          <button
            className="bg-blue-400 px-3 py-1 w-full md:w-[102px] rounded-r-lg "
            type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="p-3 gap-2">
        <h1 className="text-md">
          Showing Search results for {showSearchValue}
        </h1>
        <h2 className="text-md mb-2">
          Total channels : {searchData?.length || 0}
        </h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : !error ? (
            searchData ? (
              searchData?.length > 100 ? (
                searchData?.slice(0, 100).map((item, index) => (
                  <div key={index}>
                    <p>
                      {" "}
                      {index + 1}.{" "}
                      <a href={item.url} target="_blank">
                        {item.channel || item.title}
                      </a>
                    </p>
                  </div>
                ))
              ) : (
                searchData?.map((item, index) => (
                  <div key={index}>
                    <p>
                      {" "}
                      {index + 1}.{" "}
                      <a href={item.url} target="_blank">
                        {item.channel || item.title}
                      </a>
                    </p>
                  </div>
                ))
              )
            ) : (
              <div className="p-4 text-lg bg-green ">
                {" "}
                <p>No data found</p>{" "}
              </div>
            )
          ) : (
            <div className="text-lg flex flex-col items-center justify-center p-4 bg-green-400">
              <p>Error: {error.message}</p>
            </div>
          )}
        </div>
      </div>
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
