import { Helmet } from "react-helmet-async";

export default function Library() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <Helmet>
        <title>Iptv library coming soon...</title>
        <meta
          name="description"
          content="Learn more about our IPTV Player and the team behind the experience."
        />
      </Helmet>
      <h1 className="text-xl">Library page</h1>
      <p className="text-lg">Coming Soon...</p>
    </div>
  );
}
