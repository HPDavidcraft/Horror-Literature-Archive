import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Horror Literature Archive",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#1a1a1a", // Deep dark background
          lightgray: "#2d2d2d", // Borders
          gray: "#8c8c8c", // Graph links, heavier borders
          darkgray: "#d4d4d4", // Body text
          dark: "#ffffff", // Header text and icons
          secondary: "#b30000", // Crimson red for links and current graph node
          tertiary: "#ff3333", // Hover states and visited graph nodes
          highlight: "rgba(179, 0, 0, 0.15)", // Internal link background, highlighted text
          textHighlight: "#b3000088", // Markdown highlighted text background
        },
        darkMode: {
          light: "#0a0a0a", // Pitch black background
          lightgray: "#1f1f1f", // Borders
          gray: "#666666", // Graph links, heavier borders
          darkgray: "#e0e0e0", // Body text
          dark: "#ffffff", // Header text and icons
          secondary: "#8a0303", // Deep blood red for links
          tertiary: "#cc0000", // Bright red hover states
          highlight: "rgba(138, 3, 3, 0.15)", // Internal link background
          textHighlight: "#8a030388", // Markdown highlighted text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
