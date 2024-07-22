import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import NavList from "../NavList/NavList";
import { Button } from "../../common/Button/Button";
import { links } from "../../../constants/links";
import { useAuthStore } from "../../../store/auth/index";
import { UserManage } from "../UserManage/UserManage";
import { routes } from "../../../routes/routes";

export const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.navbarHolder}>
        <div
          className={styles.logoHolder}
          onClick={handleNavigate(routes.HOME)}
        >
          <img src={logo} alt="logo" />
          <p>FindService</p>
        </div>

        <div className={styles.navigateHolder}>
          <NavList links={links} />

          {user !== null ? (
            <UserManage />
          ) : (
            <Button
              onClick={handleNavigate(routes.LOGIN)}
              className={styles.loginBtn}
              title={"Login / Sign Up"}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
