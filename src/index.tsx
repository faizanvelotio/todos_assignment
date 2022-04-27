import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UserContentProvider } from "src/context/UserContentContext";
import App from "src/App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <UserContentProvider>
            <App />
        </UserContentProvider>
    </BrowserRouter>
);
