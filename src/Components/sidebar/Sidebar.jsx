import BasicControls from "./BasicControls";
import BasicFilters from "./BasicFilters";
import { useState } from "react";
import BasicInfo from "./BasicInfo";

import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  return (
    <div className="lg:col-span-1 ">
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
  );
};

export default Sidebar;

Sidebar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numbersOfPages: PropTypes.number.isRequired,
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
};
