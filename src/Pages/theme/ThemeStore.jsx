import { Link } from "react-router-dom";

const ThemeStore = () => {
  // add a theme store under settings, create theme collection

  // add primary themes like Default (with light and dark theme),
  // HyperLand,
  // Opera Gx,
  // Anime Style,
  // custom color (with color system, option),
  // upload image wallpaper

  return (
    <div className="p-4">
      <h1>This is theme store</h1>
      <section>
        collections of theme and apply any theme by selecting from here
      </section>
      <div className="p-4 ">
        <div className="flex flex-col lg:flex-row items-start justify-start flex-wrap gap-4">
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">Default Theme</h>
            <p className="my-2 text-md text-gray-700">
              Add primary themes <br /> (Default light or dark)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-default`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">HyperLand Theme</h>
            <p className="my-2 text-md text-gray-700">
              Add HyperLand themes <br /> (..........)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-hyperLand`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">Opera Gx Theme</h>
            <p className="my-2 text-md text-gray-700">
              Add Opera Gx themes <br /> (..........)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-operagx`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">
              Anime Style Theme
            </h>
            <p className="my-2 text-md text-gray-700">
              Add Anime Style themes <br /> (..........)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-anime-style`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">
              Custom color Theme
            </h>
            <p className="my-2 text-md text-gray-700">
              Add custom color themes <br /> (with plain color, gradient, etc)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-custom-color`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
          <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
            <h className="text-lg font-medium text-white  ">
              upload wallpaper Theme
            </h>
            <p className="my-2 text-md text-gray-700">
              upload wallpaper <br /> (..........)
            </p>
            <div className="flex flex-row items-start justify-start gap-4 ">
              <Link to={`/theme-upload-image`}>
                <p className="underline text-black">details</p>
              </Link>
              <button className="">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeStore;
