module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx}"],
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
    },
  },
};
