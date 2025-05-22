import { useState } from "react"
import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { FaCheck } from "react-icons/fa"

import { routes } from "../../config/routes"

import ErrMessage from "../../components/ErrMessage"

import IRegister from "../../types/IRegister"

function SignUpPage() {
  const [ isCheckPass, setCheckPass ] = useState(false)
  const [ isCheckPassConfirm, setCheckPassConfirm ] = useState(false)
  const [ isAgree, setAgree ] = useState(false)

  // Новые состояния для отображения ошибок с сервера и успеха
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const toggleCheckPass = () => setCheckPass(!isCheckPass)
  const toggleCheckPassConfirm = () => setCheckPassConfirm(!isCheckPassConfirm)
  const toggleAgree = () => setAgree(!isAgree)

  const { register, handleSubmit, formState } = useForm<IRegister>({
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setServerErrors({})
    setSuccessMessage("")

    const requestData = {
      username: data.username,
      email: data.email,
      password: data.password,
      password2: data.passwordConfirm,
      first_name: data.firstName,
      last_name: data.lastName,
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      )

      if (response.ok) {
        setSuccessMessage("Вы успешно зарегистрированы! Теперь можете войти.")
      } else {
        const errorData = await response.json()
        setServerErrors(errorData)
      }
    } catch (_) {
      setServerErrors({ non_field_errors: ["error 500."] })
    }
  }

  const firstNameErr = formState.errors.firstName?.message || serverErrors.first_name?.[0]
  const lastNameErr = formState.errors.lastName?.message || serverErrors.last_name?.[0]
  const usernameErr = formState.errors.username?.message || serverErrors.username?.[0]
  const emailErr = formState.errors.email?.message || serverErrors.email?.[0]
  const passErr = formState.errors.password?.message || serverErrors.password?.[0]
  const passConfirmErr = formState.errors.passwordConfirm?.message || serverErrors.password2?.[0]
  const nonFieldErrors = serverErrors.non_field_errors

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper">
        <h2>SignUp</h2>

        <div>
          {nonFieldErrors && nonFieldErrors.map((err, i) => (
            <ErrMessage key={i} err={err} />
          ))}
          {successMessage && <p className="good_message">{successMessage}</p>}
        </div>


        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("firstName", {
              minLength: 1,
              maxLength: 100,
            })}
          />
          <ErrMessage err={firstNameErr} />
        </div>

        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("lastName", {
              minLength: 1,
              maxLength: 100,
            })}
          />
          <ErrMessage err={lastNameErr} />
        </div>

        <div>
          <label htmlFor="username">
            Username <span>*</span>
          </label>
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
          <ErrMessage err={usernameErr} />
        </div>

        <div>
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <ErrMessage err={emailErr} />
        </div>

        <div>
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            type={!isCheckPass ? "password" : "text"}
            id="password"
            {...register("password", {
              required: "This field is required",
            })}
          />
          <button type="button" className="btn_check" onClick={toggleCheckPass}>
            {!isCheckPass ? <FiEye size={30} /> : <FiEyeOff size={30} />}
          </button>
          <ErrMessage err={passErr} />
        </div>

        <div>
          <label htmlFor="configrm_password">
            Confirm password<span>*</span>
          </label>
          <input
            type={!isCheckPassConfirm ? "password" : "text"}
            id="configrm_password"
            {...register("passwordConfirm", {
              required: "This field is required",
            })}
          />
          <button
            type="button"
            className="btn_check"
            onClick={toggleCheckPassConfirm}
          >
            {!isCheckPassConfirm ? <FiEye size={30} /> : <FiEyeOff size={30} />}
          </button>
          <ErrMessage err={passConfirmErr} />
        </div>

        <div className="question">
          <input
            type="checkbox"
            name="question"
            id="question"
            onChange={toggleAgree}
          />
          <label htmlFor="question" className="question_disigne">
            <FaCheck size={18} />
          </label>
          <label htmlFor="question">
            You agree to our
            <a href="https://zoographia.ru/upload/iblock/f5e/h6up57sp4z07z1nsdx8cq5e5514m4bwv.jpg">
              privacy policy
            </a>
            ?
          </label>
        </div>

        <div className="links">
          <Link to={routes.user.login.mask}>Do you have an account?</Link>
        </div>

        <div className="btns">
          <button type="submit" className="btn" disabled={!isAgree}>
            SignUp
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUpPage
