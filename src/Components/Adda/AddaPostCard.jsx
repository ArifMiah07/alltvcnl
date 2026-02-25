const AddaPostCard = () => {
  return (
    <section className=" w-full h-full grid grid-cols-12">
      {/*  */}
      {/* interaction */}
      <div className=" w-full flex flex-col col-span-1">
        <div className="bg-[#FEAEAE]">index</div>
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
              <div className=" col-span-8 bg-[#979EC6]  w-full flex flex-col ">
                <div>
                  <h1>heading</h1>
                </div>
                <div>
                  <p>captions</p>
                </div>
              </div>
              <div className=" col-span-4 bg-[#D9D9D9] ">
                <p>files (images, video, audio, docs)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#B1DAFF] row-span-1">
            <p>timestamps</p>
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
