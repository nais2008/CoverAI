import { Link } from "react-router-dom";

import coverLogo from "/logo.svg"

import "./Header.scss"

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
            <Link to="/">CoverAI</Link>
          </li>
          <li>
            <Link to="/">API</Link>
          </li>
        </ul>
      </nav>
      <div className="links">
        <Link className="btn" to="/chat">Try CoverAI</Link>
        <Link className="btn" to="/chat">Sign Up</Link>
      </div>
    </header>
  )
}

export default Header
