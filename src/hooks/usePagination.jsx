import { useContext } from "react";
import { PaginationContext } from "../Contexts/PaginationContext";

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(`usePagination must be use within PaginationProvider`);
  }
  return context;
};
