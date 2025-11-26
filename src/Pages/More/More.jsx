import { Helmet } from "react-helmet-async";

import IPTVLN from "../IPTVComponent/IPTVLN";

const More = () => {
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <Helmet>
        <title>Watch and View All IPTV Channels</title>
      </Helmet>
      <h1 className="text-black  text-lg font-medium ">All IPTV Channels</h1>
      <IPTVLN></IPTVLN>
    </div>
  );
};

export default More;
