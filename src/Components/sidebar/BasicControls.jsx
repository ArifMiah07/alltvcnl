import PropTypes from "prop-types";

const BasicControls = ({
  currentPage,
  numbersOfPages,
  inputRange,
  setInputRange,
  onNext,
  onPrev,
  onGoto,
  // channelsPerPage,
  channelsInput,
  setChannelsInput,
  handleChannelsPerPage,
  // totalChannels,
}) => {
  // react states

  // handler functions

  return (
    <div className="flex flex-col gap-4">
      {/* next page btn */}
      <button
        onClick={onNext}
        disabled={currentPage >= numbersOfPages}
        className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] dark:text-white  ${
          currentPage >= numbersOfPages
            ? "text-gray-400"
            : "text-black hover:text-white"
        } `}>
        Next Page
      </button>
      {/* previous page btn */}
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] dark:text-white ${
          currentPage <= 1 ? "text-gray-400 " : "text-black hover:text-white "
        } `}>
        Previous Page
      </button>
      {/* handle go to a specific page with user input */}
      <div className="w-full ">
        {/* form */}
        <form onSubmit={onGoto} className=" w-full flex flex-col ">
          <label htmlFor="goto_page" className="mb-1">
            Go to a page
          </label>
          <div className="w-full flex flex-row  ">
            {/* take input */}
            <input
              className="outline-0 w-full text-center  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] dark:text-black text-md  hover:bg-[#a100ff] hover:text-white"
              value={inputRange}
              onChange={(e) => setInputRange(e.target.value)}
              placeholder="Go to a page"
              type="text"
              min={1}
            />
            {/* go to btn */}
            <button
              type="submit"
              disabled={inputRange === ""}
              className={`w-fit px-2  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] dark:text-white  ${
                inputRange === ""
                  ? "text-gray-400 "
                  : "text-black hover:text-white "
              }  `}>
              Go
            </button>
          </div>
        </form>
      </div>
      {/* handle a specific numbers of channels per page with user input */}
      <div className="w-full  ">
        {/* form */}
        <form
          onSubmit={handleChannelsPerPage}
          className=" w-full flex flex-col  ">
          {/* handle numbers of cnl's per page */}
          <label htmlFor="goto_page" className="mb-1">
            Channels per page
          </label>
          <div className="w-full flex flex-row  ">
            {/* take input */}
            <input
              className="outline-0 w-full text-center   border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md dark:text-black hover:bg-[#a100ff] hover:text-white "
              value={channelsInput}
              onChange={(e) => setChannelsInput(e.target.value)}
              placeholder="Chanls per page"
              type="text"
              min={1}
            />
            {/* go to btn */}
            <button
              type="submit"
              disabled={channelsInput === ""}
              className={`w-fit px-2 border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md dark:text-white hover:bg-[#a100ff]  ${
                channelsInput === ""
                  ? "text-gray-400 "
                  : "text-black hover:text-white "
              }  `}>
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
    // <div className=" border border-pink-500 flex flex-row gap-3 p-2 w-full">
    //   {/* basic information and action */}
    // </div>
  );
};

export default BasicControls;

BasicControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numbersOfPages: PropTypes.number.isRequired,
  inputRange: PropTypes.number.isRequired,
  setInputRange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onGoto: PropTypes.func.isRequired,
  // channelsPerPage: PropTypes.number.isRequired,
  channelsInput: PropTypes.number.isRequired,
  setChannelsInput: PropTypes.func.isRequired,
  handleChannelsPerPage: PropTypes.func.isRequired,
  // totalChannels: PropTypes.number.isRequired,
};
