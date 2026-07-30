//

const SidebarSkeleton = () => {
  return (
    <div className="lg:col-span-1 ">
      <div className="w-full border-b-2 border-red-50 ">
        <div className="  w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
          <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold ">
            Basic Info{" "}
            {/* <span onClick={toggleBasicInfoExpand} className="">
              {expandBasicInfo ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
          </h3>
        </div>
        <div className={`mb-4`}>
          <div className="w-full flex flex-col items-center gap-2 px-2">
            {/* total channels */}
            <p className={`w-full text-center border-2 border-red-50 `}>
              Total Channels:
            </p>
            {/* total pages */}
            <p className={`w-full text-center border-2 border-red-50 `}>
              Total Pages:
            </p>
            {/* show current page */}
            <p className={`w-full text-center border-2 border-red-50 `}>
              Current Page:
            </p>
            {/* channels per page */}
            <p className={`w-full text-center border-2 border-red-50 `}>
              Channels/page:
            </p>
            <div></div>
          </div>
        </div>
      </div>
      <div className="w-full border-b-2 border-red-50 ">
        <div className=" w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
          <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold mt-4 ">
            Basic Controls{" "}
            {/* <span onClick={toggleBasicControlsExpand} className="">
              {expandBasicControls ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
          </h3>
        </div>
        <div className={`mb-4 px-2`}>
          <div className="flex flex-col gap-4">
            {/* next page btn */}
            <button
              //   onClick={onNext}
              //   disabled={currentPage >= numbersOfPages}
              className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
              Next Page
            </button>
            {/* previous page btn */}
            <button
              //   onClick={onPrev}
              //   disabled={currentPage <= 1}
              className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
              Previous Page
            </button>
            {/* handle go to a specific page with user input */}
            <div className="w-full ">
              {/* form */}
              <form className=" w-full flex flex-col ">
                <label htmlFor="goto_page" className="mb-1">
                  Go to a page
                </label>
                <div className="w-full flex flex-row  ">
                  {/* take input */}
                  <input
                    className="outline-0 w-full text-center  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white"
                    // value={inputRange}
                    // onChange={(e) => setInputRange(e.target.value)}
                    placeholder="Go to a page"
                    type="text"
                    min={1}
                  />
                  {/* go to btn */}
                  <button
                    // type="submit"
                    // disabled={inputRange === ""}
                    className={`w-fit px-2  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff]  `}>
                    Go
                  </button>
                </div>
              </form>
            </div>
            {/* handle a specific numbers of channels per page with user input */}
            <div className="w-full  ">
              {/* form */}
              <form
                // onSubmit={handleChannelsPerPage}
                className=" w-full flex flex-col  ">
                {/* handle numbers of cnl's per page */}
                <label htmlFor="goto_page" className="mb-1">
                  Channels per page
                </label>
                <div className="w-full flex flex-row  ">
                  {/* take input */}
                  <input
                    className="outline-0 w-full text-center   border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white "
                    // value={channelsInput}
                    // onChange={(e) => setChannelsInput(e.target.value)}
                    placeholder="Chanls per page"
                    type="text"
                    min={1}
                  />
                  {/* go to btn */}
                  <button
                    type="submit"
                    // disabled={channelsInput === ""}
                    className={`w-fit px-2 border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                    Set
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">{/* <BasicFilters /> */}</div>
    </div>
  );
};

export default SidebarSkeleton;
