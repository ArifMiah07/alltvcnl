import PropTypes from "prop-types";
import { usePagination } from "../../hooks/usePagination";

const PaginationNumbers = ({
  numbersOfPages,
  currentPage,
  handleCurrentPage,
}) => {
  const { handleNextPage, handlePrevPage } = usePagination();
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______START HERE______ */
  const maxPagesToShow = 10;
  const half = Math.floor(maxPagesToShow / 2);

  // Determine start page
  let startPage = Math.max(1, currentPage - half);

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
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  return (
    <div className="w-full h-full ">
      <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
        {pagesArray
          ?.filter((page) => page <= numbersOfPages)
          .map((page, index) => (
            <button
              onClick={() => handleCurrentPage(page)}
              key={index}
              className={` border border-[#ff00ff] dark:text-white text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
                page === currentPage ? "bg-green-500 text-white" : ""
              }  `}>
              {page}
            </button>
          ))}
        {/* <span>{"..."}</span> */}
        <button
          disabled
          className={` bg-green-900 text-white border border-[#ff00ff]  py-2 px-3 `}>
          {numbersOfPages}
        </button>
        <button
          // onClick={() => handleCurrentPage(page)}
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={` border border-[#ff00ff] dark:text-white text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5 ${
            currentPage <= 1
              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600"
              : "text-black hover:text-white"
          } `}>
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= numbersOfPages}
          // onClick={() => handleCurrentPage(page)}
          className={` border border-[#ff00ff] dark:text-white text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5 ${
            currentPage >= numbersOfPages
              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600"
              : "text-black hover:text-white"
          } `}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationNumbers;

PaginationNumbers.propTypes = {
  numbersOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleCurrentPage: PropTypes.func,
};
