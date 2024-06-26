import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import NavList from "../NavList/NavList";
import Button from "../../common/Button/Button";
import { links } from "../../../constants/links";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center gap-1 px-16 py-8 border-b-2">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <img className="w-16 mb-1" src={logo} alt="logo" />
          <p className="text-2xl font-black mb-1">Logoipsum</p>
        </div>

        <NavList links={links} />
      </div>

      <Button
        onClick={handleLoginNavigate}
        className="text-base text-white font-medium tracking-wide bg-indigo-500 px-6 py-4 rounded-lg"
        title={"Login / Sign Up"}
      />
    </nav>
  );
};

export default Navbar;
