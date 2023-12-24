import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "~/layouts/main";

// Pages
import Home from "~/pages/home";
import Login from "~/pages/login";
import Register from "~/pages/register";
import ChoicePage from "~/pages/choice-page";
import Game from "~/pages/game";
import Profile from "~/pages/profile";
import Result from "~/pages/result";
import Leaderboards from "~/pages/leaderboards";

// Components
import ProtectedRoute from "~/routes/components/protected-route";
import GuestRoute from "~/routes/components/guest-route";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/choice-page/:categoryId",
        element: (
          <ProtectedRoute>
            <ChoicePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/game",
        element: (
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/result",
        element: (
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leaderboards",
        element: <Leaderboards />,
      },
    ],
  },
]);

export default routes;
