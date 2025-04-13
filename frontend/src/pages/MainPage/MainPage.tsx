import FilesUploadPanel from "../../components/FilesUploadPanel"
import Slider from "./components/Slider"

import "./MainPage.scss"

export const MainPage = () => {
  return (
    <div>
      <FilesUploadPanel onSubmit={() => console.log("qwe")} />
        <Slider />
    </div>
  )
}

export default MainPage
