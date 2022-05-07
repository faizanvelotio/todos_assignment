import { createTheme } from "@mui/material/styles";
import AlegreyaMedium from "src/assets/fonts/Alegreya-Medium.ttf";
import OpenSans from "src/assets/fonts/OpenSans-Regular.ttf";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    alegreya: React.CSSProperties;
    mainPageHeading: React.CSSProperties;
    mainPageBody: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    alegreya?: React.CSSProperties;
    mainPageHeading?: React.CSSProperties;
    mainPageBody?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    alegreya: true;
    mainPageHeading: true;
    mainPageBody: React.CSSProperties;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#57CCA3", // Marine
    },
    secondary: {
      main: "#015249", // Forest
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    alegreya: {
      fontFamily: "Alegreya, Arial, serif",
      fontSize: 14,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Alegreya';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Alegreya'), local('Alegreya-Medium'), url(${AlegreyaMedium}) format('truetype');
        }

        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Water Brush'), local('WaterBrush-Regular'), url(${OpenSans}) format('truetype');
        }        
      `,
    },
  },
});

theme.typography.mainPageHeading = {
  fontFamily: "Alegreya, Arial, serif",
  [theme.breakpoints.up("lg")]: {
    fontSize: "4.5rem",
    lineHeight: "4rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "3rem",
    lineHeight: "3.2rem",
  },
  [theme.breakpoints.between("xs", "md")]: {
    fontSize: "2.5rem",
    lineHeight: "2.2rem",
  },
};

theme.typography.body1 = {
  fontFamily: "'Open Sans', san-serif",
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.3rem",
    lineHeight: "1.6rem",
  },
  [theme.breakpoints.between("xs", "lg")]: {
    fontSize: "1rem",
    lineHeight: "1.4rem",
  },
};

export default theme;
