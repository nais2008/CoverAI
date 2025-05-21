import React from "react"

import IError from "../../types/IError"


const ErrMessage: React.FC<IError> = ({ err }: IError) => {
  return (
    <>
      {
        err && (
          <p className="error">
            { err }
          </p>
        )
      }
    </>
  )
}

export default React.memo(ErrMessage)
