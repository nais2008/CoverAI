import { Link } from "react-router-dom"

import "./Page404.scss"

export const Page404 = () => {
  return (
    <section className="glassBlock404">
      <center>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/" className="btn">Go home</Link>
      </center>
    </section>
  )
}

export default Page404
