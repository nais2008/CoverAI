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

  const toggleCheckPass = () => {
    setCheckPass(!isCheckPass)
  }
  const toggleCheckPassConfirm = () => {
    setCheckPassConfirm(!isCheckPassConfirm)
  }
  const toggleAgree = () => {
    setAgree(!isAgree)
  }

  const { register, handleSubmit, formState } = useForm<IRegister>({
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<IRegister> = (data) => {
    console.log(data)
  }

  const firstNameErr = formState.errors.firstName?.message
  const lastNameErr = formState.errors.lastName?.message
  const usernameErr = formState.errors.username?.message
  const emailErr = formState.errors.email?.message
  const passErr = formState.errors.password?.message
  const passConfirmErr = formState.errors.passwordConfirm?.message

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="wrapper">
        <h2>SignUp</h2>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            { ...register(
              "firstName",
              {
                minLength: 1,
                maxLength: 100,
              }
            )}
          />
          <ErrMessage err={ firstNameErr } />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            { ...register(
              "lastName",
              {
                minLength: 1,
                maxLength: 100,
              }
            )}
          />
          <ErrMessage err={ lastNameErr } />
        </div>
        <div>
          <label htmlFor="username">Username <span>*</span></label>
          <input
            type="text"
            id="username"
            { ...register(
              "username",
              {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9_]+$/i,
                  message: "Username must start with a letter and contain only English letters, digits, or underscores",
                },
                maxLength: 30,
                minLength: 3,
              }
            )}
          />
          <ErrMessage err={ usernameErr } />
        </div>
        <div>
          <label htmlFor="email">Email <span>*</span></label>
          <input
            type="email"
            id="email"
            { ...register(
              "email",
              {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                }
              }
            )}
          />
          <ErrMessage err={ emailErr } />
        </div>
        <div>
          <label htmlFor="password">Password <span>*</span></label>
          <input
            type={!isCheckPass ? "password" : "text"}
            id="password"
            { ...register(
              "password",
              {
                required: "This field is required",
              }
            )}
          />
          <button
            type="button"
            className="btn_check"
            onClick={ toggleCheckPass }
          >
            {
              !isCheckPass ? (
                <FiEye size={30} />
              ) : (
                <FiEyeOff size={30} />
              )
            }
          </button>
          <ErrMessage err={ passErr } />
        </div>
        <div>
          <label htmlFor="configrm_password">Confirm password <span>*</span></label>
          <input
            type={!isCheckPassConfirm ? "password" : "text"}
            id="configrm_password"
            { ...register(
              "passwordConfirm",
              {
                required: "This field is required",
              }
            )}
          />
          <button
            type="button"
            className="btn_check"
            onClick={ toggleCheckPassConfirm }
          >
            {
              !isCheckPassConfirm ? (
                <FiEye size={30} />
              ) : (
                <FiEyeOff size={30} />
              )
            }
          </button>
          <ErrMessage err={ passConfirmErr } />
        </div>
        <div className="question">
          <input type="checkbox" name="question" id="question" onChange={ toggleAgree }/>
          <label htmlFor="question" className="question_disigne"><FaCheck size={18} /></label>
          <label htmlFor="question">You agree to our <a href="https://zoographia.ru/upload/iblock/f5e/h6up57sp4z07z1nsdx8cq5e5514m4bwv.jpg">privacy policy</a>?</label>
        </div>
        <div className="links">
          <Link to={ routes.user.login.mask }>Do you have an account?</Link>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn"
            disabled={ !isAgree }
          >
            SignUp
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUpPage
