const AddaPostCard = () => {
  return (
    <section className=" w-full h-full grid grid-cols-12">
      {/*  */}
      {/* interaction */}
      <div className=" w-full flex flex-col col-span-1">
        <div className="bg-[#FEAEAE]">index</div>
        {/* like, dislike,show, hide, love, hate,funny, unfny,uvote, dvote, slct-tier, rate */}
        <div className="bg-[#FFF3A2]">reactions</div>
        <div className="bg-[#E9FFC7]">comment</div>
        <div className="bg-[#B1D4FF]">share</div>
      </div>
      {/* content */}
      <div className="  w-full flex flex-col col-span-10">
        <div className="grid grid-rows-4">
          <div className=" row-span-3 w-full flex flex-row ">
            {/* heading and caption */}
            <div className="w-full grid grid-cols-12">
              <div className=" col-span-8 bg-[#979EC6]  w-full flex flex-col px-2 ">
                <div>
                  <h1 className=" text-lg font-bold mb-1.5 ">
                    Danish government agency to ditch Microsoft software in push
                    for digital independence
                  </h1>
                </div>
                <div>
                  <p className=" text-md font-medium mb-1 ">
                    Denmark’s tech modernization agency plans to replace
                    Microsoft products with open-source software to reduce
                    dependence on U.S. tech firms. In an interview with the
                    {/* local newspaper Politiken, Danish Minister for
                    Digitalisation Caroline Stage Olsen confirmed that over half
                    of the ministry’s staff will switch from Microsoft Office to
                    LibreOffice next month, with a full transition to
                    open-source software by the end of the year. */}
                  </p>
                </div>
              </div>
              <div className=" col-span-4 bg-[#D9D9D9] ">
                <p>files (images, video, audio, docs)</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-2 px-2 py-1 bg-[#B1DAFF] row-span-1">
            <p>timestamps</p>
            <p>posted by</p>
            <p>views</p>
            <p>tier</p>
            <p>top reaction</p>
            <p>mostly vote</p>
            <p>mostly loved</p>
            <p>positive</p>
            <p>mostly liked</p>
            <p>#something #hashtag #hash #tag</p>
          </div>
        </div>
      </div>
      {/* user choice */}
      <div className="bg-[#D999FF] w-full flex flex-col  col-span-1">
        <div>setting</div>
        <div>expand</div>
        <div>full view</div>
        <div>save</div>
      </div>
    </section>
  );
};

export default AddaPostCard;
