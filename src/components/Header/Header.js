import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Original on Transparent.png";

export default function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/feed">
          <img className="header__logo" src={Logo} alt="Logo" />
        </Link>

        <div className="header__directory">
          <NavLink to="/feed" className="header__link">
            <div className="header__warehouse">Feed</div>
          </NavLink>
          <NavLink to="/myprofile" className="header__link">
            <div className="header__warehouse">My Features</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
