import React, { useContext, useState } from "react"
import AuthContext from "../../context/AuthContext"
import IRegister from "../../types/IRegister"

interface EditProfileModalProps {
  onClose: () => void
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const { user } = useContext(AuthContext)!
  const [formData, setFormData] = useState<Partial<IRegister>>({
    username: user?.username || "",
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    password: "",
    passwordConfirm: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match")
      return
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/me/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authTokens") && JSON.parse(localStorage.getItem("authTokens")!).access}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Profile updated successfully")
        onClose()
      } else {
        alert("Error updating profile")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
              />
            </div>
            <div>
              <input
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
            <div className="btns">
              <button type="submit" className="btn">Save</button>
              <button type="button" onClick={onClose} className="btn">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
