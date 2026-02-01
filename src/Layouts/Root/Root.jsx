import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { Helmet } from "react-helmet-async";
import { Toaster } from "sonner";

const Root = () => {
  // this is root page
  /**
   * explaining later
   */
  return (
    <div className="relative min-h-screen flex flex-col h-fit w-full mx-auto font-poppins ">
      {/* Global SEO + Structured Data */}
      <Helmet>
        <title>All TV IPTV Player - 13K+ Live TV Channels</title>

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "All TV IPTV Player",
            url: "https://alltvcnl.netlify.app",
            description:
              "Stream over 13,000+ live IPTV channels in HD quality. Free, fast, and responsive web player.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "1250",
              bestRating: "5",
              worstRating: "1",
            },
            featureList: [
              "13,000+ Live Channels",
              "HLS Streaming",
              "Bookmark Channels",
              "Real-time Search",
              "Pagination",
              "Responsive Design",
            ],
          })}
        </script>
      </Helmet>
      <Toaster richColors position="top-right" className="fixed z-[9999]" />
      <div
        className="absolute z-0 w-full h-full -top-[60px] left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#A100FF_0%,_#3E1899_45%,_transparent_60%),_radial-gradient(circle_at_70%_35%,_#FF00B2_0%,_#99188C_45%,_transparent_60%),_radial-gradient(circle_at_50%_70%,_#00FFCC_0%,_#189984_45%,_transparent_60%)] blur-[500px] opacity-50 pointer-events-none
  "
      />

      <div className="h-fit z-20 ">
        <NavBar></NavBar>
      </div>
      <div className=" z-10 flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
