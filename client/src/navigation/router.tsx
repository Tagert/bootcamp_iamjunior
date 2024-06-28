import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/home/index";
import { About } from "../pages/about/index";
import { Login } from "../pages/login/index";
import { Register } from "../pages/register/index";
import { SearchCategory } from "../pages/search/[category]";
import { NotFound } from "../pages/not-found/index";
import { routes } from "./routes";
import { Services } from "../pages/services/index";

const routeObjects = [
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.SERVICES,
    element: <Services />,
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
