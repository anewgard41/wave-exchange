import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.jsx";
import { LyricSearchPage } from "./components/LyricSearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <App/>
      },
      {
        path: "/search",
        element: <LyricSearchPage />,
      },
    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <RouterProvider router={router}/>
);
