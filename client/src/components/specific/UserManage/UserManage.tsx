import styles from "./UserManage.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { GoSignOut } from "react-icons/go";
import { useAuthStore } from "../../../store/use-auth.store";
import { getInitials } from "../../../utils/get-initials";

const UserManage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [isUserBoxVisible, setUserBoxVisible] = useState(false);

  if (!user) {
    return null;
  }

  const handleNavigateToMyBookings = () => {
    navigate(routes.USER_BOOKINGS.url(user.id).toLocaleLowerCase());
  };

  const handleNavigateToProfile = () => {
    navigate(routes.USER_PROFILE);
  };

  const toggleUserBox = () => {
    setUserBoxVisible(!isUserBoxVisible);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <>
      <div className={styles.userManage}>
        <div className={styles.user}>
          <div className={styles.avatar} onClick={toggleUserBox}>
            <p className={styles.initials}>{getInitials(user.email)}</p>

            <div
              className={
                isUserBoxVisible ? styles.userNameBox : styles.userNameBoxHide
              }
            >
              <div className={styles.signOutHolder}>
                <h3>{user.name}</h3>

                <button
                  className={styles.userProfile}
                  onClick={handleNavigateToProfile}
                >
                  <p>Profile</p>
                </button>

                <button
                  className={styles.myBookings}
                  onClick={handleNavigateToMyBookings}
                >
                  <p>My Bookings</p>
                </button>

                <button className={styles.signOut} onClick={handleSignOut}>
                  <p>Logout</p>

                  <GoSignOut />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { UserManage };
