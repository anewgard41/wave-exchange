import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.jsx";
import { LyricSearchPage } from "./components/LyricSearchPage.jsx";
import LoginPage from "./components/login.jsx";
import SignUpPage from "./components/signup.jsx";
import DonatePage from "./components/donate.jsx";
import LandingPage from "./components/landing.jsx";
import UserPage from "./components/user.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage/>
      },
      {
        path: "/search",
        index: true,
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
      },
      {
        path: '/myaccount',
        element: <UserPage />
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
);
