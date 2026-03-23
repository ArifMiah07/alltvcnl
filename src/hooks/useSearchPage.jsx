// use search page is seems like not a good name for a hook but anyway

import { useContext } from "react";
import { SearchPageContext } from "../Contexts/search/SearchPageContext";

export const useSearchPage = () => {
  const context = useContext(SearchPageContext);
  if (!context) {
    throw new Error(`useSearchPage must be use within SearchPageProvider`);
  }

  return context;
};
