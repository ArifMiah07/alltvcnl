import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import { PaginationProvider } from "./Contexts/PaginationContext";
import { LocalStorageProvider } from "./Contexts/LocalStorageContext";
import { ThemeProvider } from "./Contexts/themes/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <PaginationProvider>
        <LocalStorageProvider>
          <HelmetProvider>
            <RouterProvider router={router}></RouterProvider>
          </HelmetProvider>
        </LocalStorageProvider>
      </PaginationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
