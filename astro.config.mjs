export default {
  buildOptions: {
    site: "https://robinmetral.com",
    sitemap: true,
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  markdownOptions: {
    remarkPlugins: ["remark-footnotes", "@silvenon/remark-smartypants"],
    rehypePlugins: [
      [
        "rehype-add-classes",
        {
          ".footnotes ol": "text-small", // smaller type for footnotes
        },
      ],
    ],
  },
};
