import { SITE_URL } from "./api/config";

export const SITE_NAME = "IPTV Player";
export const SITE_TITLE = "IPTV Player – 13K+ Live TV Channels | Fast, Responsive IPTV Web App";
export const SITE_DESCRIPTION =
  "Stream over 13,000+ live IPTV channels in a fast, fully responsive web app with real-time search, bookmarks, playlists, pagination, and an HLS player.";
export const OG_TITLE = "IPTV Player – 13K+ Live TV Channels";
export const OG_DESCRIPTION =
  "Fast IPTV streaming app with 13K+ live channels, bookmarking, playlists, pagination, and stream preview.";
export const OG_IMAGE = `${SITE_URL}/og-banner.webp`;
export const OG_IMAGE_WIDTH = 1904;
export const OG_IMAGE_HEIGHT = 969;

export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AllTVCNL IPTV Player",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Windows, macOS, Linux",
    image: OG_IMAGE,
    offers: {
      "@type": "Offer",
      price: "0",
    },
  };
}

export function faqSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many live channels can I browse?",
        acceptedAnswer: { "@type": "Answer", text: "You can browse over 13,000 live IPTV channels from the collected catalog and production API." },
      },
      {
        "@type": "Question",
        name: "Can I save favorite channels?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Favorites and playlists are stored locally on your device with no account required." },
      },
      {
        "@type": "Question",
        name: "Does the player work on mobile and desktop?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. The responsive player works in the browser on desktop, tablet, and mobile, and a desktop build is also available." },
      },
    ],
  };
}

export function homeSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [webApplicationSchema(), faqSchema()],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function collectionSchema(name: string, description: string, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    mainEntity: {
      "@type": "ItemList",
      name,
    },
  };
}

export function catalogSchema(name: string, description: string, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      collectionSchema(name, description, path),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name, path },
      ]),
    ],
  };
}

export function searchResultsSchema(term: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: term ? `Search results for ${term}` : "Search IPTV channels",
    url: `${SITE_URL}/search${term ? `?q=${encodeURIComponent(term)}` : ""}`,
    mainEntity: {
      "@type": "ItemList",
      name: "IPTV channel search results",
    },
  };
}
