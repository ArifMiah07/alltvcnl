import PropTypes from "prop-types";

const PaginationControls = ({
  currentPage,
  numbersOfPages,
  inputRange,
  setInputRange,
  onNext,
  onPrev,
  onGoto,
}) => {
  return (
    <div className=" border border-red-500 flex flex-row gap-3 p-3 w-full">
      {/* basic information and action */}
      <div className="flex flex-row gap-4">
        {/* show current page */}
        <p className={`text-lg font-md bg-green-400 px-4 py-2 rounded-sm `}>
          Current Page: {currentPage}
        </p>
        {/* next page btn */}
        <button
          onClick={onNext}
          disabled={currentPage >= numbersOfPages}
          className={`text-lg font-md  px-4 py-2 rounded-sm ${
            currentPage >= numbersOfPages ? "bg-gray-400" : "bg-green-400"
          } `}>
          Next Page
        </button>
        {/* previous page btn */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 1}
          className={`text-lg font-md px-4 py-2 rounded-sm ${
            currentPage <= 1 ? "bg-gray-400 " : "bg-green-400 "
          } `}>
          Previous Page
        </button>
        {/* handle go to a specific page with user input */}
        <div className="text-lg font-md bg-green-400 px-4 py-2 rounded-sm">
          {/* form */}
          <form onSubmit={onGoto} className="">
            {/* take input */}
            <input
              className="outline-0"
              value={inputRange}
              onChange={(e) => setInputRange(e.target.value)}
              placeholder="Go to a page"
              type="text"
              min={1}
            />
            {/* go to btn */}
            <button type="submit" className="outline-0 ">
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numbersOfPages: PropTypes.number.isRequired,
  inputRange: PropTypes.number.isRequired,
  setInputRange: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onGoto: PropTypes.func.isRequired,
};
