import { Link } from "react-router-dom"

import { routes } from "../../config/routes"

import "./SignUpPage.scss"

function SignUpPage() {
  return (
    <form>
      <div className="wrapper">
        <h2>SignUp</h2>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="configrm_password">Confirm password</label>
          <input type="password" name="configrm_password" id="configrm_password" />
        </div>
        <div className="links">
          <Link to={ routes.user.login.mask }>Do you have an account?</Link>
        </div>
        <div className="btns">
          <button type="submit" className="btn">Login</button>
        </div>
      </div>
    </form>
  )
}

export default SignUpPage

