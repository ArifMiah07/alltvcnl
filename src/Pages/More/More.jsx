import { Helmet } from "react-helmet-async";

import IPTVLN from "../IPTVComponent/IPTVLN";

const More = () => {
  return (
    <div className="dark:bg-black">
      {/* <NavBar></NavBar> */}
      <Helmet>
        <title>Watch and View All IPTV Channels</title>
      </Helmet>
      <h1 className="text-black dark:text-white text-lg font-medium ">
        All IPTV Channels
      </h1>
      <IPTVLN></IPTVLN>
    </div>
  );
};

export default More;
