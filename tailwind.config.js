module.exports = {
  mode: "jit",
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx}"],
    safelist: ["footnotes"], // from remark-footnotes (via astro/markdown)
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
            color: null,
            a: null, // overrides prose styles
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
