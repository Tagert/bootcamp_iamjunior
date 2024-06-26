import { LinksType } from "../../../types/links.type";
import { Link } from "react-router-dom";

type NavListProp = {
  links: LinksType[];
};

const NavList = ({ links }: NavListProp) => {
  return (
    <div className="flex gap-6">
      {links.map((l) => (
        <Link className=" text-xl font-medium" key={l.id} to={l.href}>
          {l.title}
        </Link>
      ))}
    </div>
  );
};

export default NavList;
