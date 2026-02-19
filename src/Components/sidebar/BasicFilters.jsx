import { Grid3x3, Rows3 } from "lucide-react";
import PropTypes from "prop-types";
import { usePagination } from "../../hooks/usePagination";

const BasicFilters = () => {
  // const [showGrid, setShowGrid] = useState(false);
  // const handleToggleMoreChannelsLayout = () => {
  //   setShowGrid(!showGrid);
  // };

  const { showMoreChannelsInGridView, handleToggleMoreChannelsLayout } =
    usePagination();

  return (
    <div className="w-full">
      {/* <h3 className="text-lg font-bold my-4 ">Filters</h3> */}
      <div className="w-full flex flex-col border-2 border-red-50">
        <p className="px-2">More Channels</p>
        {/* total channels */}
        <button
          onClick={handleToggleMoreChannelsLayout}
          className={`w-full text-center border-t-2 border-red-50 flex flex-row items-center justify-center gap-1 `}>
          {showMoreChannelsInGridView ? (
            <span className="flex flex-row items-center justify-center gap-1">
              <Rows3 /> Show List View
            </span>
          ) : (
            <span className="flex flex-row items-center justify-center gap-1">
              <Grid3x3 /> Show Grid View
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BasicFilters;

BasicFilters.propTypes = {
  showMoreChannelsInGridView: PropTypes.bool,
  setShowMoreChannelsInGridView: PropTypes.func,
  handleToggleMoreChannelsLayout: PropTypes.func,
};
