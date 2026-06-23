// use search page is seems like not a good name for a hook but anyway

import { useContext } from "react";
import { CollectedChannelsContext } from "../Contexts/collectedChannels/CollectedChannelsContext";
// import { SearchPageContext } from "../Contexts/search/SearchPageContext";

export const useCollectedChannels = () => {
  const context = useContext(CollectedChannelsContext);
  if (!context) {
    throw new Error(
      `useCollectedChannels must be use within CollectedChannelsProvider`,
    );
  }

  return context;
};
