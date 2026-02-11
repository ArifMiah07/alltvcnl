import { useState } from "react";
import { SettingsContext } from "./SettingsContext";
import PropTypes from "prop-types";
export const SettingProvider = ({ children }) => {
  // states

  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideChannelsInfo, setHideChannelsInfo] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);
  const [hidePaginationBtns, setHidePaginationBtns] = useState(false);
  const [hideMoreChannelsSection, setHideMoreChannelsSection] = useState(false);

  const [isSettingModalOpen, setIsSettingsModalOpen] = useState(false);

  // handle
  //
  const handleSidebarVisibility = (value) => {
    setHideSidebar(value);
  };

  //
  const handleChannelsInfoVisibility = (value) => {
    setHideChannelsInfo(value);
  };
  //
  const handleNavBarVisibility = (value) => {
    setHideNavBar(value);
  };
  //
  const handlePaginationBtnsVisibility = (value) => {
    setHidePaginationBtns(value);
  };
  //
  const handleMoreChannelsSectionVisibility = (value) => {
    setHideMoreChannelsSection(value);
  };

  const handleSettings = () => {
    setIsSettingsModalOpen(!isSettingModalOpen);
  };

  // if (isSettingModalOpen) {
  //   console.log("modal is open");
  // } else {
  //   console.log("modal is closed");
  // }

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
    hidePaginationBtns,
    setHidePaginationBtns,
    hideMoreChannelsSection,
    setHideMoreChannelsSection,
    handlePaginationBtnsVisibility,
    handleMoreChannelsSectionVisibility,
    isSettingModalOpen,
    setIsSettingsModalOpen,
    handleSettings,
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
