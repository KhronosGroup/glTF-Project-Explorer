module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // Perhaps we can enable this in the future.
  theme: {
    extend: {
      boxShadow: {
        sharp: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        primary: "#222",
        "near-white": "#fcfcfc",
        "link-focus": "#5772ce",
        "gltf-green": "#87c540",
      },
    },
    fontFamily: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;",
    },
  },
  plugins: [],
};