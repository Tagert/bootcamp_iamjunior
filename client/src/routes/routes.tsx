export const routes = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CONTACT_US: "/contact-us",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH_CATEGORY: {
    path: "/search/:category",
    url: (category: string) => `search/${category}`,
  },
  BUSINESS_ID: {
    path: "/business/:id",
    url: (id: string) => `business/${id}`,
  },
  NOT_FOUND: "/not-found",
};
