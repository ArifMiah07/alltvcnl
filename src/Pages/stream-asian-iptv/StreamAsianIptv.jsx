import { Helmet } from "react-helmet-async";
import Page1 from "../Page1";

const StreamAsianIptv = () => {
  const pageTitle = "Watch Asian IPTV Channels Live | All TV IPTV Player";
  const pageDescription =
    "Stream live Asian TV channels including Korean, Japanese, Chinese, Indian, Thai, and more. Watch Asian IPTV streams in HD quality for free.";
  const canonicalUrl = "https://alltvcnl.netlify.app/stream/asian-iptv";
  const keywords =
    "asian iptv, korean tv live, japanese tv channels, chinese tv streaming, indian iptv, thai tv live, asian channels free";

  return (
    <>
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
          content="https://alltvcnl.netlify.app/og-asian-iptv.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://alltvcnl.netlify.app/og-asian-iptv.png"
        />

        {/* Structured Data - BroadcastService */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BroadcastService",
            name: "Asian IPTV Channels",
            description: pageDescription,
            provider: {
              "@type": "Organization",
              name: "All TV IPTV Player",
              url: "https://alltvcnl.netlify.app",
            },
            broadcastDisplayName: "Asian TV Channels",
            broadcastTimezone: "Asia/Seoul",
            potentialAction: {
              "@type": "WatchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: canonicalUrl,
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
            areaServed: {
              "@type": "Place",
              name: "Worldwide",
            },
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://alltvcnl.netlify.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Asian IPTV Channels",
                item: canonicalUrl,
              },
            ],
          })}
        </script>
      </Helmet>

      <div>
        {/* Add semantic HTML for better SEO */}
        <article>
          <header>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Watch Asian IPTV Channels Live
            </h1>
            <p className="text-center text-black mb-6">
              Stream live TV from Korea, Japan, China, India, Thailand, and
              across Asia
            </p>
          </header>

          <Page1 />
        </article>
      </div>
    </>
  );
};

export default StreamAsianIptv;
