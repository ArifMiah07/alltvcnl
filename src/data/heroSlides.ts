export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: "/hero/hero-img-Action-Hollywood-Movies.webp",
    title: "Action Hollywood Movies",
    description: "Watch Hollywood movies from a decades-old archive, streaming live around the clock.",
    category: "Action",
    url: "https://amg01076-lightningintern-actionhollywood-samsungau-rs69y.amagi.tv/playlist/amg01076-lightningintern-actionhollywood-samsungau/playlist.m3u8",
  },
  {
    id: 2,
    imageUrl: "/hero/hero-img-mr-bean.webp",
    title: "Mr. Bean Anime Italy",
    description: "Classic comedy and animation, collected in one easy live channel.",
    category: "2D Animation",
    url: "https://amg00627-amg00627c29-rakuten-it-3989.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanitcc-rakutenit/playlist.m3u8",
  },
  {
    id: 3,
    imageUrl: "/hero/hero-img-bbc-earth.webp",
    title: "BBC Earth UK",
    description: "Feel the rhythm of the natural world with stunning nature documentaries.",
    category: "Nature",
    url: "https://amg00793-amg00793c6-xumo-us-2669.playouts.now.amagi.tv/BBCStudios-BBCEarthA-hls/playlist.m3u8",
  },
  {
    id: 4,
    imageUrl: "/hero/hero-img-heritage-plus.webp",
    title: "HERITAGE+",
    description: "Discover heritage, history, and the stories behind the world's greatest wonders.",
    category: "History",
    url: "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e4523706-f2a8-4b0f-b081-40fe59a46f81/manifest.m3u8",
  },
  {
    id: 5,
    imageUrl: "/hero/hero-img-the-explorers.webp",
    title: "The Explorers",
    description: "Travel to the most wonderful and beautiful places on Earth.",
    category: "Documentary",
    url: "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e4523706-f2a8-4b0f-b081-40fe59a46f81/manifest.m3u8",
  },
];
