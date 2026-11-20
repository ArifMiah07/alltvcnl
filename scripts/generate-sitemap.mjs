import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(root, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://alltvcnl.netlify.app").replace(/\/+$/, "");
const lastmod = new Date().toISOString().slice(0, 10);
const pages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/home", priority: "0.9", changefreq: "daily" },
  { path: "/streams", priority: "0.9", changefreq: "daily" },
  { path: "/verified", priority: "0.9", changefreq: "daily" },
  { path: "/search", priority: "0.8", changefreq: "weekly" },
  { path: "/china", priority: "0.8", changefreq: "daily" },
  { path: "/collected", priority: "0.8", changefreq: "daily" },
  { path: "/favorites", priority: "0.6", changefreq: "weekly" },
  { path: "/playlists", priority: "0.6", changefreq: "weekly" },
  { path: "/playlist-player", priority: "0.7", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
];

for (let page = 1; page <= 10; page += 1) {
  pages.push({ path: `/streams?page=${page}`, priority: page === 1 ? "0.9" : "0.8", changefreq: "daily" });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /watch

Sitemap: ${siteUrl}/sitemap.xml
`;

const targets = ["public", "dist-web", "dist"].map((directory) => path.join(projectRoot, directory));
for (const target of targets) {
  if (target !== path.join(projectRoot, "public") && !fs.existsSync(target)) continue;
  fs.writeFileSync(path.join(target, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(target, "robots.txt"), robots);
}

console.log("Sitemap and robots generated");
