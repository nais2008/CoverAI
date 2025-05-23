import React, { useContext, useState } from "react"

import AuthContext from "../../../context/AuthContext"

import InfoNewsModal from "./InfoNewsModal"

import { NewsCartProps } from "../../../types/News"

import { MdDelete } from "react-icons/md"

const NewsCart: React.FC<NewsCartProps> = ({
  title,
  description,
  createdAt,
  image,
  onDelete
}: NewsCartProps) => {
  const context = useContext(AuthContext)
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)

  if (!context) {
    throw new Error("MyComponent must be used within an AuthProvider")
  }

  const { user } = context

  let parseDescription
  if ( description.length >= 175 ) {
    parseDescription = description.slice(0, 172) + "..."
  } else{
    parseDescription = description
  }

  function stripHtml(html: string): string {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }

  return (
    <>
      <div className="news-cart">
        { image && <img src={ "http://localhost:8000" + image } alt={ title } /> }
        <div className="news-cart__main">
          <h2>{ title }</h2>
          <p>
            { stripHtml(parseDescription) }
          </p>
        </div>
        <div className="news-cart__footer">
          <p className="news-cart__date">
            { new Date(createdAt).toLocaleString() }
          </p>
          <button
            className="btn"
            onClick={() => setIsModalInfoOpen(true)}
          >
            READ
          </button>
        </div>
        { user?.is_staff && (
          <div className="news-cart__staff">
            <button onClick={onDelete}><MdDelete size={30} /></button>
          </div>
        )}
      </div>
      <InfoNewsModal
        isOpen={isModalInfoOpen}
        onClose={() => setIsModalInfoOpen(false)}
        title={title}
        description={description}
        image={image}
        createdAt={createdAt}
      />
    </>
  )
}

export default NewsCart
