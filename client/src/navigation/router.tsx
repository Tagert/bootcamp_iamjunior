import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Services } from "../pages/Services";
import { ContactUs } from "../pages/ContactUs";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { SearchCategory } from "../pages/SearchCategory";
import { NotFound } from "../pages/NotFound";
import { routes } from "./routes";

const routeObjects = [
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.ABOUT,
    element: <About />,
  },
  {
    path: routes.SERVICES,
    element: <Services />,
  },
  {
    path: routes.CONTACT_US,
    element: <ContactUs />,
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
