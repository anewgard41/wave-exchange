import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.jsx";
import { LyricSearchPage } from "./components/LyricSearchPage.jsx";
import LoginPage from "./components/login.jsx";
import SignUpPage from "./components/signup.jsx";
import DonatePage from "./components/donate.jsx";

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
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },
      {
        path: '/donate',
        element: <DonatePage />
      }
    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <RouterProvider router={router}/>
);
