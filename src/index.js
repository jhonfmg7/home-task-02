import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// Component
import App from "./App";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";

// Css
import "./App.css";

const container = document.getElementById("app");
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "*", 
        element: <PageNotFound />
    },
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/search",
        element: <App />,
        errorElement: <Navigate to="/" />,
        children: [
            {
                path: "/search/:searchQuery",
                element: <App />,
                errorElement: <Navigate to="/" />
            },
        ]
    },
])

root.render(<RouterProvider router={router} />);
