import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { FaTimes } from "react-icons/fa"

import { InfoModalProps } from "../../../types/News"

const InfoNewsModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  createdAt
}: InfoModalProps) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="modal-content__header">
            <h2>{ new Date(createdAt).toLocaleString() }</h2>
            <button
              className="modal-content__close btn"
              onClick={onClose}
              aria-label="Закрыть"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="modalWrapper">
            { image && <img src={ "http://localhost:8000" + image } alt={ title } /> }
            <h2>{ title }</h2>
            <div
              className="modal-content__body"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default InfoNewsModal
