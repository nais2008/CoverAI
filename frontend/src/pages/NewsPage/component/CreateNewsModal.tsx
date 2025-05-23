import { AnimatePresence, motion } from "framer-motion"
import React, { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaTimes } from "react-icons/fa"

import AuthContext from "../../../context/AuthContext"

import { ModalProps, NewsItem } from "../../../types/News"

import ErrMessage from "../../../components/ErrMessage"


const CreateNewsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onNewsCreated,
}: ModalProps) => {
  const { authTokens } = useContext(AuthContext)!

  const { register, handleSubmit, formState } = useForm<NewsItem>({
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<NewsItem> = async (data) => {
    const response = await fetch(
      "http://localhost:8000/api/v1/news/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
         },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: "",
        })
      },
    )

    if (response.ok) {
      const newNews = await response.json()
      onNewsCreated(newNews)
      onClose()
    } else {
      alert("Error create news")
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="modal-content">
          <div className="modal-content__header">
            <h2>Create News</h2>
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
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  { ...register(
                    "title",
                    {
                      required: "This field is required",
                      maxLength: 150,
                      minLength: 3,
                    },
                  )}
                />
                <ErrMessage err={formState.errors.title?.message} />
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows={5}
                    { ...register(
                      "description",
                      {
                        required: "This field is required",
                        maxLength: 8000,
                      }
                    )}
                  ></textarea>
                  <ErrMessage err={formState.errors.description?.message} />
                </div>
                <div>
                  <label htmlFor="image">Image</label>

                </div>
                <div className="btns">
                  <button className="btn">Create</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CreateNewsModal
