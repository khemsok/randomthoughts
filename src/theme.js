import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily:
      "Roboto, sans-serif, Roboto Mono, monospace, Roboto Condensed, sans-serif",
    h1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    h2: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    h3: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    h4: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "700",
    },
    h5: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "700",
    },
    h6: {
      fontWeight: "700",
    },
    subtitle1: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "700",
    },
    subtitle2: {
      fontFamily: "Roboto Condensed, sans-serif",
    },
    body1: {
      fontFamily: "Roboto Condensed, sans-serif",
    },
    body2: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});

export default theme;
