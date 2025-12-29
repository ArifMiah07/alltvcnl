import PropTypes from "prop-types";

const PaginationNumbers = ({
  numbersOfPages,
  currentPage,
  handleCurrentPage,
}) => {
  //
  const startPage = Math.max(1, currentPage - 4);
  const pagesArray = Array.from({ length: 10 }, (_, i) => startPage + i);
  return (
    <div className="w-full h-full ">
      <div className="flex flex-row items-center justify-evenly gap-2 flex-wrap">
        {pagesArray?.map((page, index) => (
          <button
            onClick={() => handleCurrentPage(page)}
            key={index}
            className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
              page === currentPage ? "bg-green-500 text-white" : ""
            }  `}>
            {page}
          </button>
        ))}
        {/* <span>{"..."}</span> */}
        <button
          disabled
          className={` bg-green-900 text-white border border-red-500  py-2 px-3 `}>
          ...{numbersOfPages}
        </button>
      </div>
    </div>
  );
};

export default PaginationNumbers;

PaginationNumbers.propTypes = {
  numbersOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleCurrentPage: PropTypes.number.isRequired,
};
