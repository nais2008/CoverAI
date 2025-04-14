import { NavLink, Link } from "react-router-dom";

import "./Header.scss"

import coverLogo from "/logo.svg"

export const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        <img src={coverLogo} alt="" />
        CoverAI
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "active" : ""}
            >
             CoverAI
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/api"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              API
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="links">
        <Link className="btn btn_header" to="/chat">Try CoverAI</Link>
        <Link className="btn btn_header" to="/auth">Sign Up</Link>
      </div>
    </header>
  )
}

export default Header
