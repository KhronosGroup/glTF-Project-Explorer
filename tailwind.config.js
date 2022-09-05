module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // Perhaps we can enable this in the future.
  theme: {
    extend: {
      boxShadow: {
        sharp: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25)",
        hover:
          "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
      },
      colors: {
        primary: "#222",
        "near-white": "#fcfcfc",
        "link-focus": "#5772ce",
        "gltf-green": "#87c540",
        filter: {
          /* These are the colors that are used as the background for the filter
             tag components, used in FilterBar.css and the FilterHelpers.ts
             From https://colorbrewer2.org/#type=qualitative&scheme=Pastel2&n=8 */
          color_0: "#b3e2cd",
          color_1: "#fdcdac",
          color_2: "#cbd5e8",
          color_3: "#f4cae4",
          color_4: "#e6f5c9",
          color_5: "#fff2ae",
          color_6: "#f1e2cc",
          color_7: "#cccccc",
        },
      },
    },
    fontFamily: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
  },
  plugins: [],
};
