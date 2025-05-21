import React from "react"

import FilesUploadPanel from "../../components/FilesUploadPanel"
import Chat from "../../components/Chat"

function ChatByIdPage() {
  const [ isFirstMessage, setIsFirstMessage ] = React.useState(true)

  const toggleFirstMessage = () => {
    setIsFirstMessage(!isFirstMessage)
  }

  return (
    <>
      { isFirstMessage ? (
        <FilesUploadPanel onSubmit={ toggleFirstMessage } className="isChatPage"/>
      ) : (
        <Chat />
      )}
    </>
  )
}

export default ChatByIdPage

