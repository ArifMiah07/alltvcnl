import { Helmet } from "react-helmet-async";
import IPTVComponent from "../IPTVComponent/IPTVComponent";

const IPTV = () => {
  return (
    <div>
      <Helmet>
        <title>Watch iptv streams</title>
        <meta
          name="description"
          content="Learn more about our IPTV Player and the team behind the experience."
        />
      </Helmet>
      <IPTVComponent></IPTVComponent>
    </div>
  );
};

export default IPTV;
