import fs from "fs";

const BASE_URL = "https://alltvcnl.netlify.app";

const pages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/streams", priority: "0.9", changefreq: "daily" },
  { url: "/about", priority: "0.5", changefreq: "monthly" },
];

// Generate dynamic pages (pagination)
for (let i = 1; i <= 10; i++) {
  pages.push({
    url: `/streams?page=${i}`,
    priority: "0.8",
    changefreq: "daily",
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemap);
console.log("✅ Sitemap generated!");
