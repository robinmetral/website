module.exports = {
  mode: "jit",
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx}"],
    safelist: [
      "footnotes", // from remark-footnotes (via astro/markdown)
    ],
  },
  theme: {
    extend: {
      colors: {
        bg: {
          subtle: "var(--bg-subtle)",
          DEFAULT: "var(--bg)",
        },
        text: {
          subtle: "var(--text-subtle)",
          DEFAULT: "var(--text)",
        },
        primary: "var(--primary)",
        accent: "var(--accent)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: null, // null removes prose styles
            h2: null,
            h3: null,
            h4: null,
            a: null,
            "ul > li::before": {
              backgroundColor: "currentColor",
            },
            "ol > li::before": {
              color: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
