import styles from "./UserManage.module.scss";
import { useState } from "react";
import { GoSignOut } from "react-icons/go";
import { useAuthStore } from "../../../store/auth/index";

const UserManage = () => {
  const { user, logout } = useAuthStore();

  const [isUserBoxVisible, setUserBoxVisible] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "";
    const firstLetter = name.charAt(0).toUpperCase();
    const secondLetter = name.charAt(1).toLowerCase();
    return `${firstLetter}${secondLetter}`;
  };

  const toggleUserBox = () => {
    setUserBoxVisible(!isUserBoxVisible);
  };

  const handleSignOut = () => {
    logout();
  };

  if (!user) {
    return null;
  }

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
                <p>{user.name}</p>

                <button className={styles.signOut} onClick={handleSignOut}>
                  <p>Sign Out</p>

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
