import axios from "axios";
import { useEffect, useState } from "react";

const TestingPage = () => {
  //
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchValue, setShowSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //   const [searchValue, setSearchValue] = useState(() => {
  //     const storeSearchValue = localStorage.getItem("search_value");
  //     return storeSearchValue ? JSON.parse(storeSearchValue) : "";
  //   });
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-12 flex flex-col gap-4">
      <h1 className="text-sm mb-4">this is testing page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="name">Enter Your Name - {showSearchValue} </label>
        <input
          className="p-3 "
          type="text"
          value={searchValueInputRange}
          onChange={(e) => setSearchValueInputRange(e.target.value)}
          placeholder="plz enter ur name"
        />
        <button className="bg-blue-400 p-2" type="submit">
          Submit
        </button>
      </form>

      <div className="p-12">
        <div>
          {searchData &&
            (searchData?.length > 100
              ? searchData?.slice(0, 100).map((item, index) => (
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
              : searchData?.map((item, index) => (
                  <div key={index}>
                    <p>
                      {" "}
                      {index + 1}.{" "}
                      <a href={item.url} target="_blank">
                        {item.channel || item.title}
                      </a>
                    </p>
                  </div>
                )))}
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
