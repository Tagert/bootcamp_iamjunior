import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { routes } from "./routes";
import { Home } from "../pages/home/Home";
import { About } from "../pages/about/About";
import { Services } from "../pages/services-list/Services";
import { ContactUs } from "../pages/contact-us/ContactUs";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { SearchCategory } from "../pages/search-category/SearchCategory";
import { NotFound } from "../pages/not-found/NotFound";
import { Business } from "../pages/business/Business";
import { AuthWrapper } from "../components/specific/AuthWrapper/AuthWrapper";
import { MyBookings } from "../pages/my-bookings/MyBookings";

const protectedRoute = (element: JSX.Element) => (
  <AuthWrapper>{element}</AuthWrapper>
);

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
  { path: routes.BUSINESS_ID.path, element: protectedRoute(<Business />) },
  {
    path: routes.USER_BOOKINGS.path,
    element: <MyBookings />,
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
