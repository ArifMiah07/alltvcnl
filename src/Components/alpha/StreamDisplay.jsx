import Navbar from "./Navbar";

const StreamDisplay = () => {
  //

  //

  //

  return (
    //
    //
    //
    <div className="w-full h-full border border-dashed border-white">
      <Navbar />
      <main className="w-full min-h-[calc(100vh-40px)] grid grid-cols-12 grid-rows-12 gap-1">
        <div className=" flex flex-row items-center justify-center col-span-12 row-span-1 broder border-red-500 bg-green-400 gap-4">
          1
        </div>
        <div className=" flex flex-row items-center justify-center col-span-1 row-span-12 broder border-red-500 bg-green-500 gap-4">
          2
        </div>
        <div className=" flex flex-row items-center justify-center col-span-7 row-span-12 broder border-red-500 bg-green-600 gap-4">
          3
        </div>
        <div className=" flex flex-row items-center justify-center col-span-1 row-span-12 broder border-red-500 bg-green-700 gap-4">
          4
        </div>
        <div className=" flex flex-row items-center justify-center col-span-3 row-span-12 broder border-red-500 bg-green-800 gap-4">
          5
        </div>
      </main>
    </div>
  );
};

export default StreamDisplay;
