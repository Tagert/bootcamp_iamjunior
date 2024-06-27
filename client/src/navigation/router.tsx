import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../Home";
import { About } from "../pages/about";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { SearchCategory } from "../pages/search/[category]";
import { NotFound } from "../pages/not-found";
import { routes } from "./routes";

const routeObjects = [
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.SERVICES,
    element: <Home />,
  },
  {
    path: routes.ABOUT,
    element: <About />,
  },
  {
    path: routes.LOGIN,
    element: <Login />,
  },
  {
    path: routes.REGISTER,
    element: <Register />,
  },
  {
    path: routes.SEARCH_CATEGORY.path,
    element: <SearchCategory />,
  },
  {
    path: routes.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate replace to="/not-found" />,
  },
];

const router = createBrowserRouter(
  routeObjects.map((route) => ({
    path: route.path,
    element: route.element,
  }))
);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
