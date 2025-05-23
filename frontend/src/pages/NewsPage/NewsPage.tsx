import { useContext, useEffect, useState } from "react"

import AuthContext from "../../context/AuthContext"

import NewsCart from "./component/NewsCart"

import { NewsItem } from "../../types/News"

import "./NewsPage.scss"
import CreateNewsModal from "./component/CreateNewsModal"


const NewsPage = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("MyComponent must be used within an AuthProvider")
  }

  const { user, authTokens  } = context

  const [news, setNews] = useState<NewsItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/news/")
      .then(res => res.json())
      .then(data => setNews(data))
  }, [])

  return (
    <div className="news-page">
      { user?.is_staff && (
        <button onClick={() => setIsModalOpen(true)} className="btn btn_createNews">Add news</button>
      )}

      <div className="news-list">
        {news.map(item => (
          <NewsCart
            key={item.pk}
            title={item.title}
            description={item.description}
            createdAt={item.created_at}
            image={item.image ? item.image.image : undefined}  
            onDelete={() => {
              fetch(`http://localhost:8000/api/v1/news/${item.pk}/`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${authTokens?.access}`,
                }
              }).then(() => {
                setNews(prev => prev.filter(n => n.pk !== item.pk))
              })
            }}
            id={0}
          />
        ))}
      </div>

      <CreateNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNewsCreated={(newItem) => setNews((prev) => [newItem, ...prev])}
      />
    </div>
  )
}

export default NewsPage
