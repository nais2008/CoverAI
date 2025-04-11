import { Link } from "react-router-dom";

import "./Navigation.scss"

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Main Page</Link>
      </ul>
    </nav>
  )
}

export default Navigation
