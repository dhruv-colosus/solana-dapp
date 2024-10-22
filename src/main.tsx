import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Solanaprovider from "./providers/solanaprovider.tsx";
import Layout from "./Layout.tsx";
import NotFound from "./components/NotFound.tsx";
import LauncToken from "./components/LauncToken.tsx";
import Swap from "./components/Swap.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "airdrop",
        element: <App />,
      },
      {
        path: "launchtoken",
        element: <LauncToken />,
      },
      {
        path: "swap",
        element: <Swap />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Solanaprovider>
      <RouterProvider router={router} />
    </Solanaprovider>
  </StrictMode>
);
