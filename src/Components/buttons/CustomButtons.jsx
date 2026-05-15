import PropTypes from "prop-types";

export function NavMenuButton({ label, styles }) {
  return (
    <button className={` cursor-pointer ${styles ? styles : ""} `}>
      {label}
    </button>
  );
}

NavMenuButton.propTypes = {
  label: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
};
