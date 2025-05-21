import { FiSidebar } from "react-icons/fi"
import { NavLink, Link, useLocation } from "react-router-dom"

import "./Header.scss"

import coverLogo from "/logo.svg"

interface IHeader {
  onToggleChatSidebar: () => void
  isOpen: boolean
}

export const Header: React.FC<IHeader> = ({ onToggleChatSidebar, isOpen}) => {
  const location = useLocation()
  const isChatPage: boolean = /^\/chat(\/|$)/.test(location.pathname)

  return (
    <header>
      <div>
        { (isChatPage && !isOpen) && (
          <FiSidebar className="btn_chatSidebar" onClick={ onToggleChatSidebar }/>
        )}
        <Link className="logo" to="/">
          <img src={coverLogo} alt="" />
          CoverAI
        </Link>
      </div>
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
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              News
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="links">
        <Link className="btn btn_header" to="/chat">Try CoverAI</Link>
        <Link className="btn btn_header" to="/signup">SignUp</Link>
        <Link className="btn btn_header" to="/login">LogIn</Link>
      </div>
    </header>
  )
}

export default Header
