import { NavMenuButton } from "../buttons/CustomButtons";
import PropTypes from "prop-types";

export default function GetOurApp({ handleSectionVisibility }) {
  return (
    <section className={` relative flex flex-col w-full h-full `}>
      <div className="absolute top-0 right-0">
        <button
          onClick={handleSectionVisibility}
          className="cursor-pointer tooltip ">
          <p className="tooltiptext dark:text-white text-sm">Hide</p>{" "}
          <span className="dark:text-white"> X</span>
        </button>
      </div>
      {/* heading */}
      <h1
        className={`text-[#000000b3] dark:text-white text-[24px] font-bold  `}>
        Get our app on Mobile and PC
      </h1>
      {/* content */}
      <div>
        {/*  */}
        <div className="my-4">
          <NavMenuButton
            label={"Lunch IPTV Now"}
            styles={"link-btn unique-link-btn "}></NavMenuButton>
        </div>
        {/*  */}
        <div></div>
      </div>
    </section>
  );
}

GetOurApp.propTypes = {
  handleSectionVisibility: PropTypes.func,
};
