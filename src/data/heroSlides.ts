export interface HeroSlide {
  id: number;
  imageBase: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageBase: "/hero/hero-img-Action-Hollywood-Movies",
    title: "Action Hollywood Movies",
    description: "Watch Hollywood movies from a decades-old archive, streaming live around the clock.",
    category: "Action",
    url: "https://amg01076-lightningintern-actionhollywood-samsungau-rs69y.amagi.tv/playlist/amg01076-lightningintern-actionhollywood-samsungau/playlist.m3u8",
  },
  {
    id: 2,
    imageBase: "/hero/hero-img-mr-bean",
    title: "Mr. Bean Anime Italy",
    description: "Classic comedy and animation, collected in one easy live channel.",
    category: "2D Animation",
    url: "https://amg00627-amg00627c29-rakuten-it-3989.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanitcc-rakutenit/playlist.m3u8",
  },
  {
    id: 3,
    imageBase: "/hero/hero-img-bbc-earth",
    title: "BBC Earth UK",
    description: "Feel the rhythm of the natural world with stunning nature documentaries.",
    category: "Nature",
    url: "https://amg00793-amg00793c6-xumo-us-2669.playouts.now.amagi.tv/BBCStudios-BBCEarthA-hls/playlist.m3u8",
  },
  {
    id: 4,
    imageBase: "/hero/hero-img-heritage-plus",
    title: "HERITAGE+",
    description: "Discover heritage, history, and the stories behind the world's greatest wonders.",
    category: "History",
    url: "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e4523706-f2a8-4b0f-b081-40fe59a46f81/manifest.m3u8",
  },
  {
    id: 5,
    imageBase: "/hero/hero-img-the-explorers",
    title: "The Explorers",
    description: "Travel to the most wonderful and beautiful places on Earth.",
    category: "Documentary",
    url: "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e4523706-f2a8-4b0f-b081-40fe59a46f81/manifest.m3u8",
  },
];
