import { useEffect, useState } from "react";

const WorkingUpdates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/jsons/working_updates.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="min-w-full min-h-screen p-4 dark:text-white text-black">
      <h1 className="dark:text-white text-black text-3xl">Working Updates:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data?.map((item, index) => (
          <div className="border p-4" key={index}>
            <h1 className="dark:text-white text-black text-xl mb-4">
              {item.title}
            </h1>
            <div className="dark:text-white text-black text-lg ">
              <p>{item.description}</p>
              {/* <button className="">details</button> */}
            </div>
            <div className="flex flex-row gap-2 flex-wrap items-start my-3">
              <p className="text-black dark:text-black px-2 border border-purple-600 bg-green-400">
                {item.status}
              </p>
              <p className="text-black dark:text-black px-2 border border-purple-600 bg-green-400">
                {item.topic}
              </p>
              <p className="text-black dark:text-black px-2 border border-purple-600 bg-green-400">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingUpdates;
