import axios from "axios";
import { useEffect, useState } from "react";
import StreamsPageSkeletonLoading from "../../Components/streams/StreamsPageSkeletonLoading";

const TestingPage = () => {
  // search result fetching
  const [searchData, setSearchData] = useState([]);
  const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // store data
  const [showSearchValue, setShowSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchValueInputRange, setSearchValueInputRange] = useState("");

  // pagination states
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  //   const [currentPageNumberInputRange, setCurrentPageNumberInputRange] =
  //     useState(1);

  const [channelsPerPage, setChannelsPerPage] = useState(10);
  //   const [channelsPerPageInputRange, setChannelsPerPageInputRange] =
  //     useState(10);

  //   const currentPageNumber = 1
  //   const channelsPerPage = 10
  const totalChannels = searchData?.length;
  const numbersOfPages = Math.ceil(totalChannels / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchValue(searchValueInputRange);
  };
  // handle search value
  const handleSearchValue = (value) => {
    localStorage.setItem("searchValueLocal", JSON.stringify(value));
    setSearchValue(value);
  };

  // store and get search data from browser local storage
  useEffect(() => {
    const stored = localStorage.getItem("searchValueLocal");
    setShowSearchValue(stored);
    if (stored) {
      console.log("Stored value:", JSON.parse(stored));
    }
  }, [searchValue, showSearchValue, searchValueInputRange]);
  console.log("stored ", showSearchValue);

  //   const getItem = localStorage.getItem("searchValueLocal");
  //   console.log("search: value:: ", searchValue, JSON.parse(getItem));

  // fetch search result
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const searchTerm = JSON.parse(showSearchValue);
        console.log("searchTerm", searchTerm);
        const url = `http://localhost:5000/api/iptv-player/testing-search-url?term=${searchTerm}`;
        const response = await axios.get(url);
        // console.log(response?.data);
        setSearchData(response?.data?.data);
        setCurrentIndexSet(response?.data?.currentIndexSet);
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
  }, [searchValue, showSearchValue, searchValueInputRange]);

  const handleCurrentPage = (page) => {
    console.log(" page: ", Number(page), Math.ceil(totalChannels / 10));
    if (Number(page) > 0 && Number(page) <= numbersOfPages) {
      setCurrentPageNumber(page);
    }
  };
  //   useEffect(()=> {
  //   }, [])

  console.log(searchData);

  //   const s = JSON.parse(showSearchValue);
  console.log("searchValue, showSearchValue", showSearchValue);
  //   console.log("searchValueInputRange ", searchValueInputRange);

  //   const currentPage = 10;

  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______START HERE______ */
  const maxPagesToShow = 10;
  const half = Math.floor(maxPagesToShow / 2);

  // Determine start page
  let startPage = Math.max(1, currentPageNumber - half);

  // Determine end page
  let endPage = startPage + maxPagesToShow - 1;

  // Make sure endPage doesn't exceed numbersOfPages
  if (endPage > numbersOfPages) {
    endPage = numbersOfPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate pages array
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  console.log(pagesArray);
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p> Error : {error.message} </p>;

  console.log(currentIndexSet);

  return (
    // this is search page component
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
        {/* content container */}
        <div className=" border border-red-500 w-full min-h-screen flex flex-col md:flex-row gap-2">
          {/* content */}
          <div className=" w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {!(searchData?.length === 0) ? (
              searchData?.slice(startIndex, endIndex).map((item, index) => (
                <div key={index} className="border border-red-500 p-4">
                  <p className="flex flex-row gap-2">
                    {" "}
                    {index + 1}.{" "}
                    <a href={item.url} target="_blank">
                      {item.channel || item.title}
                    </a>
                    <span>({currentIndexSet[index]})</span>
                  </p>
                  {/* <p></p> */}
                  <div></div>
                </div>
              ))
            ) : (
              <div className="p-4 text-lg bg-green ">
                {" "}
                <p>No data found</p>{" "}
              </div>
            )}
          </div>
          {/* sidebar */}
          <div>this is sidebar</div>
        </div>
        {/* pagination */}
        <div className="flex gap-2 flex-wrap my-3">
          {pagesArray
            ? pagesArray?.map((page, index) => (
                <div className="w-fit h-fit" key={index}>
                  <div>
                    <button
                      onClick={() => handleCurrentPage(page)}
                      className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
                        page === currentPageNumber
                          ? "bg-green-500 text-white"
                          : ""
                      }  `}>
                      {page}
                    </button>
                  </div>
                </div>
              ))
            : ""}
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

// //
//  searchData?.length < 1000 ? (
//                 searchData
//                   ?.slice(0, searchData?.length - 1)
//                   .map((item, index) => (
//                     <div key={index}>
//                       <p>
//                         {" "}
//                         {index + 1}.{" "}
//                         <a href={item.url} target="_blank">
//                           {item.channel || item.title}
//                         </a>
//                       </p>
//                     </div>
//                   ))
//               ) :
