// Static images are served with max-age=0 by default, so every repeat visit
// re-validates each one. Cache them for a day and refresh in the background
// for a week after that; replacing a file under the same name still shows up
// within a day.
const IMAGE_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GSAP plugin files (gsap/ScrollTrigger etc.) are ES modules without
  // "type": "module", so loading them as server externals crashes SSR on
  // Netlify. Bundling them avoids that.
  transpilePackages: ["gsap", "@gsap/react"],

  async headers() {
    return ["/projects/:path*", "/skills/:path*", "/social/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: IMAGE_CACHE }],
    }));
  },
};

module.exports = nextConfig;
