import { Link } from "react-router-dom"
import { FaGithub, FaTelegram, FaVk } from "react-icons/fa"

import "./Footer.scss"

export const Footer = () => {
  return (
    <footer>
      <section>
      <ul>
          <li>
            <Link to="/chat">Web</Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li><Link to="/">CoverAI</Link></li>
          <li><Link to="/api">API</Link></li>
          <li><Link to="/news">News</Link></li>
        </ul>
      </section>
      <section>
        <ul className="ul_ss">
          <li>
            <Link to="https://vk.com/mama_kupi_snikers" target="_blank">
              <FaVk size={40} />
            </Link>
          </li>
          <li>
            <Link to="https://t.me/MamaKupiSnikers" target="_blank">
              <FaTelegram size={40} />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/nais2008" target="_blank">
              <FaGithub size={40} />
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li><Link to="https://github.com/nais2008/CoverAI" target="_blank">GitHub Repositori</Link></li>
        </ul>
      </section>
      <p>© CoverAI {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
