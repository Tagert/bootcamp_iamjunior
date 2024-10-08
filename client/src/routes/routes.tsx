export const routes = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CONTACT_US: "/contact-us",
  LOGIN: "/login",
  REGISTER: "/register",
  MY_FAVORITES: "/my-favorites",
  USER_PROFILE: {
    path: "/user/profile/:id",
    url: (id: string) => `/user/profile/${id}`,
  },
  SEARCH_CATEGORY: {
    path: "/search/:category",
    url: (category: string) => `search/${category}`,
  },
  BUSINESS_ID: {
    path: "/business/:id",
    url: (id: string) => `business/${id}`,
  },
  USER_BOOKINGS: {
    path: "/bookings/user/:id",
    url: (id: string) => `/bookings/user/${id}`,
  },
  NOT_FOUND: "/not-found",
};
