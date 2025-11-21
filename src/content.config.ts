import { defineCollection } from "astro:content";
import { readdirSync } from "node:fs";
import { glob } from "astro/loaders";
import { BlogMetadata } from "./schemas/blog";
import { CardMetadata } from "./schemas/card";
import { DoodleMetadata } from "./schemas/doodle";
import { SlideMetadata } from "./schemas/slide";

const hasMarkdownFiles = (dir: URL): boolean => {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        return true;
      }
      if (entry.isDirectory()) {
        if (hasMarkdownFiles(new URL(`./${entry.name}/`, dir))) {
          return true;
        }
      }
    }
  } catch {
    // Directory or files may not exist yet
  }
  return false;
};

const emptyLoader = (name: string) => ({
  name: `${name}-empty-loader`,
  load: async () => {},
});

const withOptionalGlob = (
  name: string,
  options: Parameters<typeof glob>[0],
  dir: URL,
) => {
  if (hasMarkdownFiles(dir)) {
    return glob(options);
  }
  return emptyLoader(name);
};

const blogs = defineCollection({
  loader: glob({
    base: "./src/content/blogs",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: BlogMetadata,
});

const cards = defineCollection({
  loader: withOptionalGlob(
    "cards",
    { base: "./src/content/cards", pattern: "**/*.{md,mdx}" },
    new URL("./content/cards/", import.meta.url),
  ),
  schema: CardMetadata,
});

const slides = defineCollection({
  loader: withOptionalGlob(
    "slides",
    { base: "./src/content/slides", pattern: "**/*.{md,mdx}" },
    new URL("./content/slides/", import.meta.url),
  ),
  schema: SlideMetadata,
});

const doodles = defineCollection({
  loader: withOptionalGlob(
    "doodles",
    { base: "./src/content/doodles", pattern: "**/*.{md,mdx}" },
    new URL("./content/doodles/", import.meta.url),
  ),
  schema: DoodleMetadata,
});

export const collections = { blogs, cards, slides, doodles };
