import BasicControls from "./BasicControls";
import BasicFilters from "./BasicFilters";
import { useState } from "react";
import BasicInfo from "./BasicInfo";

import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";
// import PaginationNumbers from "../pagination/PaginationNumbers";

const Sidebar = ({
  currentPage,
  numbersOfPages,
  inputRange,
  setInputRange,
  onNext,
  onPrev,
  onGoto,
  channelsPerPage,
  channelsInput,
  setChannelsInput,
  handleChannelsPerPage,
  totalChannels,
  handleCurrentPage,
}) => {
  // react states
  const [expandBasicControls, setExpandBasicControls] = useState(false);
  const [expandBasicInfo, setExpandBasicInfo] = useState(false);
  // use hooks

  // handler function
  // expand basic control
  const toggleBasicControlsExpand = () => {
    //
    setExpandBasicControls(!expandBasicControls);
  };
  // expand basic control
  const toggleBasicInfoExpand = () => {
    //
    setExpandBasicInfo(!expandBasicInfo);
  };

  const startPage = Math.max(1, currentPage - 4);
  const pagesArray = Array.from({ length: 10 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-col lg:flex-row gap-2 ">
      {/* pagination */}
      <div className=" border-r border-green-500 p-1 flex flex-col items-center justify-center">
        <div className="w-full h-full ">
          <div className="flex flex-row lg:flex-col flex-wrap items-center justify-center gap-2 ">
            {pagesArray?.map((page, index) => (
              <button
                onClick={() => handleCurrentPage(page)}
                key={index}
                className={` border border-[#ff00ff] dark:text-white text-md  rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
                  page === currentPage ? "bg-green-500 text-white" : ""
                }  `}>
                {page}
              </button>
            ))}
            {/* <span>{"..."}</span> */}
            <button
              disabled
              className={` border border-[#ff00ff] text-white text-md rounded-sm  bg-[#004a00]  py-2 px-5  `}>
              {numbersOfPages}
            </button>
          </div>
        </div>
      </div>
      {/* sidebar section */}
      <div className=" w-full h-full flex flex-col">
        <div className="w-full border-b-2 border-red-50 ">
          <div className="  w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
            <h3 className=" dark:text-white flex flex-row items-center justify-center gap-1 text-lg font-bold ">
              Basic Info{" "}
              <span onClick={toggleBasicInfoExpand} className="">
                {expandBasicInfo ? <ChevronUp /> : <ChevronDown />}
              </span>
            </h3>
          </div>
          <div
            className={`mb-4 dark:text-white  ${expandBasicInfo ? "hidden" : "visible"}`}>
            <BasicInfo
              currentPage={currentPage}
              numbersOfPages={numbersOfPages}
              // inputRange={inputRange}
              // setInputRange={setInputRange}
              // onNext={onNext}
              // onPrev={onPrev}
              // onGoto={onGoto}
              channelsPerPage={channelsPerPage}
              // channelsInput={channelsInput}
              // setChannelsInput={setChannelsInput}
              // handleChannelsPerPage={handleChannelsPerPage}
              totalChannels={totalChannels}
            />
          </div>
        </div>
        <div className="w-full border-b-2 border-red-50 ">
          <div className=" w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
            <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold mt-4 dark:text-white ">
              Basic Controls{" "}
              <span onClick={toggleBasicControlsExpand} className="">
                {expandBasicControls ? <ChevronUp /> : <ChevronDown />}
              </span>
            </h3>
          </div>
          <div
            className={`mb-4 dark:text-white px-2 ${expandBasicControls ? "hidden" : "visible"}`}>
            <BasicControls
              currentPage={currentPage}
              numbersOfPages={numbersOfPages}
              inputRange={inputRange}
              setInputRange={setInputRange}
              onNext={onNext}
              onPrev={onPrev}
              onGoto={onGoto}
              channelsPerPage={channelsPerPage}
              channelsInput={channelsInput}
              setChannelsInput={setChannelsInput}
              handleChannelsPerPage={handleChannelsPerPage}
              totalChannels={totalChannels}
            />
          </div>
        </div>
        <div className="w-full dark:text-white mt-4">
          <BasicFilters />
        </div>
      </div>
    </div>
    // <div className=" ">
    // </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numbersOfPages: PropTypes.number,
  inputRange: PropTypes.number.isRequired,
  setInputRange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onGoto: PropTypes.func.isRequired,
  channelsPerPage: PropTypes.number.isRequired,
  channelsInput: PropTypes.number.isRequired,
  setChannelsInput: PropTypes.func.isRequired,
  handleChannelsPerPage: PropTypes.func.isRequired,
  totalChannels: PropTypes.number.isRequired,
  handleCurrentPage: PropTypes.func,
};
