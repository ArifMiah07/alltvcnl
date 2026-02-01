// import NavBar from "../Shared/NavBar/NavBar";

import { Helmet } from "react-helmet-async";
import Features from "../Features/Features";
// import Features from "../Features/Features";

// import { Helmet } from "react-helmet-async";

const Home = () => {
  const pageTitle =
    "All TV - Watch 13,000+ Free Live IPTV Channels Online | HD Streaming";
  const pageDescription =
    "Stream over 13,000 live IPTV channels for free. Watch TV from around the world in HD quality. Fast, responsive web player with bookmarks, search, and pagination.";
  const canonicalUrl = "https://alltvcnl.netlify.app/";
  const keywords =
    "iptv player, free iptv, live tv online, watch tv free, iptv channels, hls streaming, m3u8 player, live television";
  return (
    <div className="h-full ">
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content="https://alltvcnl.netlify.app/og-banner.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://alltvcnl.netlify.app/og-banner.png"
        />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "All TV IPTV Player",
            alternateName: "AllTV",
            url: canonicalUrl,
            description: pageDescription,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://alltvcnl.netlify.app/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {/* WebApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "All TV IPTV Player",
            url: canonicalUrl,
            description: pageDescription,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript and HTML5",
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
              "13,000+ Live TV Channels",
              "HD Streaming Quality",
              "HLS Player Support",
              "Bookmark Favorite Channels",
              "Real-time Channel Search",
              "Responsive Design",
              "Free to Use",
            ],
            screenshot: "https://alltvcnl.netlify.app/screenshot.png",
          })}
        </script>

        {/* FAQ Schema (if you have FAQs) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is All TV IPTV Player free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, All TV IPTV Player is completely free to use. You can stream over 13,000 live IPTV channels without any subscription or payment.",
                },
              },
              {
                "@type": "Question",
                name: "How many channels does All TV have?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All TV IPTV Player provides access to over 13,000 live television channels from around the world.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to register to use All TV?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No registration is required. You can start watching live TV channels immediately without creating an account.",
                },
              },
              {
                "@type": "Question",
                name: "What video quality does All TV support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All TV supports HD quality streaming through HLS technology for the best viewing experience.",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      {/* <h1 className="text-red-600 font-extrabold text-4xl">This is a part of practice project. No Harm full intention there.</h1> */}
      <div>{/* <Banner></Banner> */}</div>
      <div>
        <Features></Features>
      </div>
    </div>
  );
};

export default Home;
