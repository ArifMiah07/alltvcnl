import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import { PaginationProvider } from "./Contexts/PaginationContext";
// import { LocalStorageProvider } from "./Contexts/LocalStorageContext";
import { ThemeProvider } from "./Contexts/themes/ThemeProvider";
import { SettingProvider } from "./Contexts/settings/SettingsProvider";
import { FavoritesProvider } from "./Contexts/favorites/FavoritesProvider";
import { LocalStorageProvider } from "./Contexts/LocalStorageProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <SettingProvider>
        <PaginationProvider>
          <LocalStorageProvider>
            <FavoritesProvider>
              <HelmetProvider>
                <RouterProvider router={router}></RouterProvider>
              </HelmetProvider>
            </FavoritesProvider>
          </LocalStorageProvider>
        </PaginationProvider>
      </SettingProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
