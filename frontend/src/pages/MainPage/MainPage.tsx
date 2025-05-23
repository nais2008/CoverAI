import { useContext } from "react"
import FilesUploadPanel from "../../components/FilesUploadPanel"
import Slider from "./components/Slider"
import AuthContext from "../../context/AuthContext"
import FeedbackForm from "./components/FeedbaclForm/FeedbaclForm"


export const MainPage = () => {
 const context = useContext(AuthContext)

  if (!context) {
    throw new Error("MyComponent must be used within an AuthProvider")
  }

  const { user  } = context

  return (
    <>
      <FilesUploadPanel onSubmit={() => console.log("qwe")} />
      <Slider />
      { user?.is_staff && <FeedbackForm /> }
    </>
  )
}

export default MainPage
