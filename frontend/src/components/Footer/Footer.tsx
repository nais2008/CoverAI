import { Link } from "react-router-dom"

import "./Footer.scss"

export const Footer = () => {
  return (
    <footer>
      <section>
      <ul>
          <li>
            <Link to="/">Web</Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <Link to="/">CoverAI</Link>
          </li>
          <li>
            <Link to="/">API</Link>
          </li>
          <li>
            <Link to="/">News</Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <Link to="https://vk.com/mama_kupi_snikers" target="_blank">VK</Link>
          </li>
          <li>
            <Link to="/" target="_blank">TG</Link>
          </li>
          <li>
            <Link to="https://github.com/nais2008" target="_blank">GH</Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <Link to="https://github.com/nais2008/CoverAI" target="_blank">GH Repositori</Link>
          </li>
        </ul>
      </section>
      <p>© CoverAI {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
