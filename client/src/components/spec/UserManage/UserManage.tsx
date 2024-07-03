import styles from "./UserManage.module.scss";
import { useState } from "react";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../../../context/auth/AuthContext";

const UserManage = () => {
  const { user } = useAuth();

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
    console.log("User signed out");
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
