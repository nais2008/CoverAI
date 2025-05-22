import { useContext, useEffect, useRef, useState } from "react"
import { FiSidebar } from "react-icons/fi"
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"

import AuthContext from "../../context/AuthContext"

import IHeader from "../../types/IHeader"

import "./Header.scss"

import coverLogo from "/logo.svg"
import noProfileImage from "../../assets/img/userNoProfile.png"

export const Header: React.FC<IHeader> = ({ onToggleChatSidebar, isOpen }) => {
  const location = useLocation()
  const isChatPage: boolean = /^\/chat(\/|$)/.test(location.pathname)

  const { user, logoutUser } = useContext(AuthContext)!
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    setMenuOpen(false)
  }

  const openSettings = () => {
    navigate("/settings")
    setMenuOpen(false)
  }

  return (
    <header>
      <div>
        {isChatPage && !isOpen && (
          <FiSidebar className="btn_chatSidebar" onClick={onToggleChatSidebar} />
        )}
        <Link className="logo" to="/">
          <img src={coverLogo} alt="CoverAI Logo" />
          CoverAI
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              CoverAI
            </NavLink>
          </li>
          <li>
            <NavLink to="/api" className={({ isActive }) => (isActive ? "active" : "")}>
              API
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>
              News
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="links" ref={menuRef}>
        <Link className="btn btn_header" to="/chat">
          Try CoverAI
        </Link>
        {user ? (
          <div className="user-menu-wrapper">
            <button className="btn_user btn" onClick={() => setMenuOpen((prev) => !prev)}>
              <img
                src={
                  user.image
                    ? "http://localhost:8000" + user.image
                    : noProfileImage
                }
                alt="User avatar"
                className="btn btn_user"
              />
            </button>
            {menuOpen && (
              <div className="user-dropdown">
                <button onClick={openSettings}>Settings</button>
                <button onClick={handleLogout}>LogOut</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="btn btn_header" to="/signup">
              SignUp
            </Link>
            <Link className="btn btn_header" to="/login">
              LogIn
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
