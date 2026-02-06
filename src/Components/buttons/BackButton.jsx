import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function BackButton({ label = "", styles = "" }) {
  const navigate = useNavigate();

  return (
    <button
      className={` flex flex-row items-center justify-center dark:text-white border px-5 py-2 hover:border-purple-500 hover:bg-green-500 hover:dark:border-green-500 hover:dark:bg-purple-500 ${styles}`}
      onClick={() => navigate(-1)}>
      Back {label}
    </button>
  );
}

export default BackButton;

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
};
