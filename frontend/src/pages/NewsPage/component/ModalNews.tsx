import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { FaTimes } from "react-icons/fa"

import { ModalProps } from "../../../types/News"

const ModalNews: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="modal-content">
          <div className="modal-content__header">
            <h2>q</h2>
            <button
              className="modal-contetn__close btn"
              onClick={ onClose }
            >
              <FaTimes size={30} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalNews
