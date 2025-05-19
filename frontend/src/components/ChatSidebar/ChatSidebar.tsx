import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { FiSidebar } from "react-icons/fi"
import { IoMdSearch } from "react-icons/io"
import { CiMenuKebab } from "react-icons/ci"

import "./ChatSidebar.scss"


interface IChatSidebar {
  isOpen: boolean
  onClose: () => void
}

export const ChatSidebar: React.FC<IChatSidebar> = ({ isOpen, onClose }) => {
  return (
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
            <button className="btn">New chat</button>
          </div>
          <div className="main__sidebar">
            <h2>Chats</h2>
            <div className="wrapper">
              <div className="chat">
                Chat Name
                <CiMenuKebab size={24}/>
              </div>
              <div className="chat">
                Chat Name
                <CiMenuKebab size={24}/>
              </div>
              <div className="chat">
                Chat Name
                <CiMenuKebab size={24}/>
              </div>
              <div className="chat">
                Chat Name
                <CiMenuKebab size={24}/>
              </div>
              <div className="chat">
                Chat Name
                <CiMenuKebab size={24}/>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default ChatSidebar
