import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import { PaginationProvider } from "./Contexts/PaginationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PaginationProvider>
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
    </PaginationProvider>
  </React.StrictMode>
);
