import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#E4311F", dark: "#8E1510", contrastText: "#FFFFFF" },
    secondary: { main: "#FFE53B", dark: "#B8A000", contrastText: "#1A0A08" },
    background: { default: "#F5E1C0", paper: "#FFF8EC" },
    text: { primary: "#1A0A08", secondary: "#5A3A35" },
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h2: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h3: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 800,
          borderRadius: 2,
          paddingInline: 28,
        },
      },
    },
  },
});

export default theme;
