import { motion } from "motion/react";
import PropTypes from "prop-types";

export default function ActivityAnimated({ className = "" }) {
  const path =
    "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2";

  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-[1em] h-[1em] inline-block ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {/* Background faint line */}
      <path d={path} className="opacity-20" vectorEffect="non-scaling-stroke" />

      {/* Animated stroke */}
      <motion.path
        d={path}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          filter: "drop-shadow(0 0 6px currentColor)",
        }}
      />
    </svg>
  );
}

ActivityAnimated.propTypes = {
  className: PropTypes.string,
};
