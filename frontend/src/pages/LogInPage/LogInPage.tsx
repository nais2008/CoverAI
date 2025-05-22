import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import { FiEye, FiEyeOff } from "react-icons/fi"

import { routes } from "../../config/routes"
import ErrMessage from "../../components/ErrMessage"

import ILogin from "../../types/ILogin"

import AuthContext from "../../context/AuthContext" // путь подкорректируй под свой проект

function LogInPage() {
  const [isCheckPassword, setCheckPassword] = useState(false)
  const { loginUser } = useContext(AuthContext)!

  const toggleCheckPassword = () => {
    setCheckPassword(!isCheckPassword)
  }

  const { register, handleSubmit, formState } = useForm<ILogin>({
    mode: "onChange",
  })

  const onSubmit = (data: ILogin) => {
    loginUser(data)
  }

  const usernameError = formState.errors.username?.message
  const passwordError = formState.errors.password?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper">
        <h2>LogIn</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "This field is required",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9_]+$/i,
                message:
                  "Username must start with a letter and contain only English letters, digits, or underscores",
              },
              maxLength: 30,
              minLength: 3,
            })}
          />
          <ErrMessage err={usernameError} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={!isCheckPassword ? "password" : "text"}
            id="password"
            {...register("password", {
              required: "This field is required",
            })}
          />
          <button type="button" className="btn_check" onClick={toggleCheckPassword}>
            {!isCheckPassword ? <FiEye size={30} /> : <FiEyeOff size={30} />}
          </button>
          <ErrMessage err={passwordError} />
        </div>
        <div className="links">
          <Link to={routes.user.signup.mask}>No accaunt?</Link>
          <Link to="">Forgot your password?</Link>
        </div>
        <div className="btns">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </div>
    </form>
  )
}

export default LogInPage
