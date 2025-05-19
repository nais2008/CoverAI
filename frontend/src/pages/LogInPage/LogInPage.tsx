import { Link } from "react-router-dom"

import { routes } from "../../config/routes"


function LogInPage() {
  return (
    <form>
      <div className="wrapper">
        <h2>LogIn</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username"/>
        </div>
        <div>
          <label htmlFor="pass">Password</label>
          <input type="password" name="password" id="pass"/>
        </div>
        <div className="links">
          <Link to={ routes.user.signup.mask }>No accaunt?</Link>
          <Link to="">Forgot your password?</Link>
        </div>
        <div className="btns">
          <button type="submit" className="btn">Login</button>
        </div>
      </div>
    </form>
  )
}

export default LogInPage

