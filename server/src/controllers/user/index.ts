import { SIGN_UP } from "./auth/user-sign-up.controller";
import { LOG_IN } from "./auth/user-log-in.controller";
import { DELETE_USER_BY_ID } from "./mutations/delete-user.controller";
import { GET_ALL_USERS } from "./queries/all-users.controller";
import { GET_USER_BY_ID } from "./queries/user-by-id.controller";
import { CHANGE_PASSWORD } from "./mutations/change-password.controller";
import { ADD_FAVORITE } from "./mutations/add-favorite.controller";
import { REMOVE_FAVORITE } from "./mutations/remove-favorite.controller";

export {
  SIGN_UP,
  LOG_IN,
  DELETE_USER_BY_ID,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CHANGE_PASSWORD,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
};
