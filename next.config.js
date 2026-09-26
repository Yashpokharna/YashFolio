/** @type {import('next').NextConfig} */
const nextConfig = {
  // GSAP plugin files (gsap/ScrollTrigger etc.) are ES modules without
  // "type": "module", so loading them as server externals crashes SSR on
  // Netlify. Bundling them avoids that.
  transpilePackages: ["gsap", "@gsap/react"],
};

module.exports = nextConfig;
