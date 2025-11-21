import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@inox-tools/sitemap-ext";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { analyzer } from "vite-bundle-analyzer";
import { env } from "./src/env";

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  trailingSlash: "never",

  // 🟢 Меняем режим server → static
  output: "static",

  image: {
    domains: ["public-files.gumroad.com"],
  },

  // ❗ Убираем адаптер Vercel — он нужен только для SSR
  // adapter: vercel({ imageService: true }),

  site: env().SITE_URL,

  markdown: {
    rehypePlugins: [rehypeSanitize(defaultSchema)],
  },

  integrations: [
    sitemap({
      includeByDefault: true,
    }),

    mdx({
      rehypePlugins: [rehypeSanitize(defaultSchema)],
    }),

    react({
      include: [
        "**/components/image-viewer.tsx",
        "**/components/slide/slide-viewer.tsx",
      ],
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
      process.env.ANALYZE &&
        analyzer({
          analyzerMode: "static",
          reportFilename: "dist/bundle-report.html",
          openAnalyzer: false,
        }),
    ].filter(Boolean),
  },

  security: {
    checkOrigin: false,
  },
});
