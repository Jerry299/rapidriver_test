import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Results } from "./pages/Results/Results.tsx";
import { ArticleForm } from "./pages/Articles/Article-Form.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Results />,
  },
  {
    path: "/submit-article",
    element: <ArticleForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
