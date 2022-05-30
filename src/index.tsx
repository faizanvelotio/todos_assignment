import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UserContentProvider } from "src/context/UserContentContext";
import App from "src/App";
import theme from "src/assets/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <UserContentProvider>
        <CssBaseline>
          <App />
        </CssBaseline>
      </UserContentProvider>
    </ThemeProvider>
  </BrowserRouter>
);
