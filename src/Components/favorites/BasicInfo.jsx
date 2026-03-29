//

import PropTypes from "prop-types";

const BasicInfo = ({
  currentPage,
  numbersOfPages,
  //   inputRange,
  //   setInputRange,
  //   onNext,
  //   onPrev,
  //   onGoto,
  channelsPerPage,
  //   channelsInput,
  //   setChannelsInput,
  //   handleChannelsPerPage,
  totalChannels,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 px-2">
      {/* total channels */}
      <p className={`w-full text-center border-2 border-red-50 `}>
        Total Channels: {totalChannels}
      </p>
      {/* total pages */}
      <p className={`w-full text-center border-2 border-red-50 `}>
        Total Pages: {numbersOfPages}
      </p>
      {/* show current page */}
      <p className={`w-full text-center border-2 border-red-50 `}>
        Current Page: {currentPage}
      </p>
      {/* channels per page */}
      <p className={`w-full text-center border-2 border-red-50 `}>
        Channels/page: {channelsPerPage}
      </p>
      <div></div>
    </div>
  );
};

export default BasicInfo;

BasicInfo.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numbersOfPages: PropTypes.number.isRequired,
  channelsPerPage: PropTypes.number.isRequired,
  totalChannels: PropTypes.number.isRequired,
};
