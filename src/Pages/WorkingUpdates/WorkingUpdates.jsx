import { useEffect, useState } from "react";

import img1 from "../../assets/images/mb_v_design_1.png";
import img2 from "../../assets/images/mb_v_design_2.png";

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
      <h1 className="dark:text-white text-black text-3xl">Upcoming Updates:</h1>
      <div className="w-full border  p-4 my-4">
        <div className="w-full flex flex-row items-center justify-center mb-2">
          <h2 className="text-2xl border-b w-fit h-fit text-wrap">
            Aplha Version - v0.0.3-alpha
          </h2>
        </div>
        <div className="">
          <div className="border">
            <img
              src={img2}
              alt="mobile view design 1"
              className="w-full h-full bg-cover"
            />
            <p className="text-center">design for mobile view 1 </p>
          </div>
          <div className="border">
            <img
              src={img1}
              alt="mobile view design 2"
              className="w-full h-full bg-cover"
            />
            <p className="text-center">design for mobile view 2 </p>
          </div>
        </div>
        <div className="border p-4">
          <h3 className="text-2xl font-bold mb-6  border-b  pb-3">
            Overall Objective: Alpha Version (v0.0.3-alpha)
          </h3>

          <ul className="space-y-6">
            {/* Section 1 */}
            <li className="p-4 rounded-lg border ">
              <p className="font-semibold text-lg  mb-2">
                1. Complete minimum features and release a final version
              </p>
              <div className="pl-4">
                <p className="text-sm font-medium  mb-1">Minimum Features:</p>
                <ul className="list-disc list-inside space-y-1  text-sm">
                  <li>Create a playlist.</li>
                  <li>Group lists and filtering.</li>
                  <li>List and fix all visible bugs.</li>
                </ul>
              </div>
            </li>

            {/* Section 2 */}
            <li className=" p-4 rounded-lg border ">
              <p className="font-semibold text-lg mb-2">
                2. Make it pixel-perfect for all devices
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                <li>Design and apply layout for sm (small) devices.</li>
                <li>Design and apply layout for md (medium) devices.</li>
                <li>Design and apply layout for lg, xl, and 2xl devices.</li>
                <li>Optimize and test the UI for Android TV.</li>
              </ul>
            </li>

            {/* Section 3 */}
            <li className=" p-4 rounded-lg border ">
              <p className="font-semibold text-lg mb-2">
                3. Refactor the entire project
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                <li>Eliminate repetitive code.</li>
                <li>Implement reusable utility functions.</li>
                <li>Centralize control points for shared logic.</li>
                <li>Remove unused pages and dead code files.</li>
              </ul>
            </li>

            {/* Section 4 */}
            <li className=" p-4 rounded-lg border ">
              <p className="font-semibold text-lg mb-2">
                4. Optimize everything possible
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                <li>
                  Introduce animations thoughtfully while optimizing them for
                  low-end devices.
                </li>
                <li>
                  Remove heavily layered absolute backgrounds and complex
                  gradients.
                </li>
                <li>
                  Use smooth loading states instead of jarring or disruptive UX
                  shifts.
                </li>
                <li>
                  Host static assets (like JSON files and images) in cloud
                  storage.
                </li>
                <li>
                  Continuously profile the app for performance bottlenecks.
                </li>
              </ul>
            </li>

            {/* Section 5 */}
            <li className=" p-4 rounded-lg border ">
              <p className="font-semibold text-lg mb-2">
                5. Security audit, updates, and best practices
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                <li>Use secure, up-to-date package versions.</li>
                <li>
                  Sanitize, filter, and validate all user-supplied input before
                  processing or rendering it anywhere.
                </li>
                <li>Follow current security best practices.</li>
                <li>
                  Implement platform-specific security measures for mobile,
                  desktop (Windows/Linux), and web versions.
                </li>
                <li>
                  Review, wrap up, and prepare the project for public alpha
                  release.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkingUpdates;
