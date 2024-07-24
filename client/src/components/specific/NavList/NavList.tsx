import styles from "./NavList.module.scss";
import { LinksType } from "../../../types/links.type";
import { Link } from "react-router-dom";

type NavListProp = {
  links: LinksType[];
};

const NavList = ({ links }: NavListProp) => {
  return (
    <div className={styles.container}>
      {links.map((l) => (
        <Link key={l.id} to={l.href}>
          {l.title}
        </Link>
      ))}
    </div>
  );
};

export default NavList;
