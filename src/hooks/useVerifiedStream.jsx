import { useContext } from "react";
import { VerifiedStreamContext } from "../Contexts/verifiedStream/VerifiedStreamContext";

export const useVerifiedStream = () => {
  const context = useContext(VerifiedStreamContext);
  if (!context) {
    throw new Error(
      `useVerifiedStream must be use within VerifiedStreamProvider`,
    );
  }
  return context;
};
