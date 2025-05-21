import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { FiSidebar } from "react-icons/fi"
import { IoMdSearch } from "react-icons/io"
import { CiMenuKebab } from "react-icons/ci"

import IChatSidebar from "../../types/IChatSidebar"

import "./ChatSidebar.scss"
import CreateChatModal from "../CreateChatModal"

const ChatSidebar: React.FC<IChatSidebar> = ({
  isOpen,
  onClose
}: IChatSidebar) => {
  const [ isModalOpen, setModalOpen ] = useState(false)

  const toggleModalOpen = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <>
      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <AnimatePresence>
        { isOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="header__sidebar">
              <FiSidebar
                onClick={ onClose }
                className="btn_chatSidebar"
              />
              <IoMdSearch
                size={40}
              />
              <button className="btn" onClick={ toggleModalOpen }>
                New chat
              </button>
            </div>
            <div className="main__sidebar">
              <h2>Chats</h2>
              <div className="wrapper">
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? "active chat" : "chat"
                  }
                  to="/chat/1"
                >
                  Chat Name 1
                  <CiMenuKebab size={24}/>
                </NavLink>
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? "active chat" : "chat"
                  }
                  to="/chat/2"
                >
                  Chat Name 2
                  <CiMenuKebab size={24}/>
                </NavLink>
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? "active chat" : "chat"
                  }
                  to="/chat/3"
                >
                  Chat Name 3
                  <CiMenuKebab size={24}/>
                </NavLink>
                <NavLink
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? "active chat" : "chat"
                  }
                  to="/chat/4"
                >
                  Chat Name 4
                  <CiMenuKebab size={24}/>
                </NavLink>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatSidebar
