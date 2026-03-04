export const theme = {
  palette: {
    black: "#FAFAFA",
    white: "#0A0A0A",
    grey: {
      50: "#141414",
      100: "#1E1E1E",
      200: "#2A2A2A",
      300: "#444444",
      500: "#9E9E9E",
      700: "#BDBDBD",
      900: "#E0E0E0",
    },
    primary: "#FAFAFA",
  },
  fonts: {
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)",
    cardHover: "0 10px 40px rgba(0,0,0,0.3)",
    nav: "0 1px 0 rgba(255,255,255,0.05)",
  },
  radii: { sm: 6, md: 12, lg: 16, xl: 24, pill: 100 },
  transition: {
    default: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    card: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fadeIn:
      "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
    nav: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
