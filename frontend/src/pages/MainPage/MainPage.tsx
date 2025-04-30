import FilesUploadPanel from "../../components/FilesUploadPanel"
import Slider from "./components/Slider"


export const MainPage = () => {
  return (
    <>
      <FilesUploadPanel onSubmit={() => console.log("qwe")} />
      <Slider />
    </>
  )
}

export default MainPage
