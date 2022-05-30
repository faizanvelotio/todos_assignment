import { createTheme } from "@mui/material/styles";
import React from "react";
import AlegreyaMedium from "src/assets/fonts/Alegreya-Medium.ttf";
import OpenSans from "src/assets/fonts/OpenSans-Regular.ttf";
import OpenSansCondensed from "src/assets/fonts/OpenSans_Condensed-SemiBold.ttf";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    postHeading: React.CSSProperties;
    pageHeading: React.CSSProperties;
    mainPageBody: React.CSSProperties;
    buttonText: React.CSSProperties;
    commentTitle: React.CSSProperties;
    commentBody: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    postHeading?: React.CSSProperties;
    pageHeading?: React.CSSProperties;
    mainPageBody?: React.CSSProperties;
    buttonText?: React.CSSProperties;
    commentTitle?: React.CSSProperties;
    commentBody?: React.CSSProperties;
  }

  interface Palette {
    fontGray: React.CSSProperties["color"];
    fontLightGray: React.CSSProperties["color"];
    lightGrayBG: React.CSSProperties["color"];
    lightBorderLine: React.CSSProperties["color"];
  }

  interface PaletteOptions {
    fontGray: React.CSSProperties["color"];
    fontLightGray: React.CSSProperties["color"];
    lightGrayBG: React.CSSProperties["color"];
    lightBorderLine: React.CSSProperties["color"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    postHeading: true;
    pageHeading: true;
    mainPageBody: true;
    buttonText: true;
    commentTitle: true;
    commentBody: true;
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
    fontGray: "#393D46",
    fontLightGray: "#A8A8A8",
    lightGrayBG: "#FAFAFA",
    lightBorderLine: "#E0E0E0",
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
    commentTitle: {
      fontFamily: "'Open Sans Condensed', sans-serif",
      fontSize: "1.2rem",
      lineHeight: "1.5rem",
    },
    commentBody: {
      fontSize: "0.8rem",
      lineHeight: "1.1rem",
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
          src: local('Open Sans'), local('OpenSans-Regular'), url(${OpenSans}) format('truetype');
        }
        
        @font-face {
          font-family: 'Open Sans Condensed';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('OpenSansCondensed'), local('OpenSans_Condensed-SemiBold'), url(${OpenSansCondensed}) format('truetype');
        }
      `,
    },
  },
});

theme.typography.pageHeading = {
  fontFamily: "Alegreya, Arial, serif",
  color: theme.palette.fontGray,
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

theme.typography.postHeading = {
  fontFamily: "'Open Sans Condensed', sans-serif",
  color: theme.palette.fontGray,
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
    lineHeight: "3rem",
  },
  [theme.breakpoints.between("xs", "md")]: {
    fontSize: "2rem",
    lineHeight: "2.5rem",
  },
};

theme.typography.body1 = {
  fontFamily: "'Open Sans', san-serif",
  color: theme.palette.fontGray,
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

theme.typography.buttonText = {
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
