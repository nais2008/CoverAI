import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaTimes } from "react-icons/fa"

import { CreateChatModalProps, CreateChatProps } from "../../types/CreateChatModalProps"
import ErrMessage from "../ErrMessage"

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  onClose,
}: CreateChatModalProps) => {
  const { register, handleSubmit, formState } = useForm<CreateChatProps>({
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<CreateChatProps> = (data) => {
    console.log(data)
    onClose()
  }
  const nameErr = formState.errors.name?.message

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
        >
          <div className="modal-content__header">
            <h2>Create Chat</h2>
            <button
              className="modal-contetn__close btn"
              onClick={ onClose }
            >
              <FaTimes size={30} />
            </button>
          </div>
          <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="wrapper">
              <div>
                <label htmlFor="name">Chat name</label>
                <input
                  type="text"
                  id="name"
                  { ...register(
                    "name",
                    {
                      required: "This field is required",
                      maxLength: 50,
                    }
                  )}
                />
                <ErrMessage err={nameErr} />
              </div>
              <div>
                <label htmlFor="icon">Chat icon</label>
                <input
                  type="file"
                  accept="image/*"
                  id="icon"
                  { ...register(
                    "icon",
                  )}
                />
              </div>
              <div className="btns">
                <button className="btn">Create Chat</button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CreateChatModal
