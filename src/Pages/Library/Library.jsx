import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Library() {
  const pageTitle = "IPTV Channel Library - Browse Live TV by Region | All TV";
  const pageDescription =
    "Explore our extensive IPTV channel library. Browse live TV channels by region including Worldwide, Asian, Chinese, and more. Find your favorite channels instantly.";
  const canonicalUrl = "https://alltvcnl.netlify.app/library";
  const keywords =
    "iptv library, tv channel categories, live tv regions, asian iptv, chinese iptv, worldwide tv channels";

  const channels = [
    {
      title: "Stream Worldwide IPTV",
      description: "Access 13,000+ global IPTV channels from every continent",
      link: "/stream-iptv",
      icon: "🌍",
      count: "13,000+",
    },
    {
      title: "Stream Asian IPTV",
      description: "Watch live TV from Korea, Japan, India, Thailand, and more",
      link: "/stream/asian-iptv",
      icon: "🌏",
      count: "2,500+",
    },
    {
      title: "Stream Chinese IPTV",
      description: "CCTV, provincial channels, and Mandarin content",
      link: "/stream/china-iptv",
      icon: "🇨🇳",
      count: "1,800+",
    },
    {
      title: "Watch IPTV Player",
      description: "Advanced IPTV player with bookmarks and search",
      link: "/iptv",
      icon: "📺",
      count: "All Channels",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col p-4 items-start justify-start dark:bg-black ">
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
          content="https://alltvcnl.netlify.app/og-library.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://alltvcnl.netlify.app/og-library.png"
        />

        {/* Structured Data - CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "IPTV Channel Library",
            description: pageDescription,
            url: canonicalUrl,
            publisher: {
              "@type": "Organization",
              name: "All TV IPTV Player",
              url: "https://alltvcnl.netlify.app",
            },
            hasPart: channels.map((channel) => ({
              "@type": "WebPage",
              name: channel.title,
              description: channel.description,
              url: `https://alltvcnl.netlify.app${channel.link}`,
            })),
          })}
        </script>

        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "IPTV Channel Categories",
            description: "Browse IPTV channels by region and category",
            numberOfItems: channels.length,
            itemListElement: channels.map((channel, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: channel.title,
              description: channel.description,
              url: `https://alltvcnl.netlify.app${channel.link}`,
            })),
          })}
        </script>

        {/* Breadcrumb */}
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
                name: "Channel Library",
                item: canonicalUrl,
              },
            ],
          })}
        </script>
      </Helmet>
      {/* SEO Header */}
      <header className="mb-8 max-w-4xl dark:text-white">
        <h1 className="text-4xl font-bold mb-4">IPTV Channel Library</h1>
        <p className="text-xl dark:text-white text-gray-700  mb-2">
          Browse our extensive collection of live TV channels organized by
          region and category
        </p>
        <p className="text-lg dark:text-white text-gray-700">
          Access thousands of IPTV channels from around the world. Choose your
          region to start streaming.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row items-start justify-start flex-wrap gap-4">
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">
            Stream World Wide IPTV
          </p>
          <Link to={`/stream-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Stream Asian IPTV</p>
          <Link to={`/stream/asian-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        {/* stream/china-iptv */}
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Stream China IPTV</p>
          <Link to={`/stream/china-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Watch IPTV</p>
          <Link to={`/iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Adda</p>
          <Link to={`/adda`}>
            <p className="underline text-black">Start adda</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
