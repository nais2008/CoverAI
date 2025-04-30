import React from "react"

import FilesUploadPanel from "../../components/FilesUploadPanel"

import "./ChatPage.scss"

export const ChatPage = () => {
  const [ isFirstMessage, setIsFirstMessage ] = React.useState(true)

  const toggleFirstMessage = () => {
    setIsFirstMessage(!isFirstMessage)
  }

  return (
    <>
      { isFirstMessage && (
        <FilesUploadPanel onSubmit={ toggleFirstMessage } className=""/>
      ) }
    </>
  )
}

export default ChatPage
