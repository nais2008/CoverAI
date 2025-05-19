import { Link } from "react-router-dom"

import "./Page404.scss"

import okak from "../../assets/img/okak.png"

export const Page404 = () => {
  return (
    <section className="glassBlock404">
      <div className="wrapper">
        <span>4</span>
        <img src={okak} alt="okak" />
        <span>4</span>
        <Link to="/" className="btn btn_okak">Go home</Link>
      </div>
    </section>
  )
}

export default Page404
