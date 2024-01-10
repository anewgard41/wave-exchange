import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LyricStore } from "./LyricStore.jsx";
import { UserStore } from "./UserStore.jsx";
import App from "./components/App.jsx";
import { LyricSearchPage } from "./components/LyricSearchPage.jsx";
import LoginPage from "./components/login.jsx";
import SignUpPage from "./components/signup.jsx";
import DonatePage from "./components/donate.jsx";
import LandingPage from "./components/landing.jsx";
import UserPage from "./components/user.jsx";
import PaymentPage from "./components/payment.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
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
      },
      {
        path: '/payment',
        element: <PaymentPage />
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LyricStore>
    <UserStore>
      <RouterProvider router={router} />
    </UserStore>
  </LyricStore>
);
