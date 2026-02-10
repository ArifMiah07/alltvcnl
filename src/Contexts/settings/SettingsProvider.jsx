import { useState } from "react";
import { SettingsContext } from "./SettingsContext";
import PropTypes from "prop-types";
export const SettingProvider = ({ children }) => {
  // states
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideChannelsInfo, setHideChannelsInfo] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);

  // handle
  //
  const handleSidebarVisibility = () => {
    //
    setHideSidebar(!hideSidebar);
  };

  //
  const handleChannelsInfoVisibility = () => {
    //
    setHideChannelsInfo(!hideChannelsInfo);
  };
  //
  const handleNavBarVisibility = () => {
    //
    setHideNavBar(!hideNavBar);
  };

  //
  const getValues = {
    hideSidebar,
    setHideSidebar,
    hideChannelsInfo,
    setHideChannelsInfo,
    hideNavBar,
    setHideNavBar,
    handleSidebarVisibility,
    handleChannelsInfoVisibility,
    handleNavBarVisibility,
  };

  return (
    <SettingsContext.Provider value={getValues}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingProvider.propTypes = {
  children: PropTypes.node,
};
