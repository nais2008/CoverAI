import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import { routes } from "./config/routes"

import MainPage from "./pages/MainPage"
import APIPage from "./pages/APIPage"
import NewsPage from "./pages/NewsPage"
import ChatByIdPage from "./pages/ChatByIdPage"
import ChatPage from "./pages/ChatPage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
// import ActivatePage from "../pages/ActivatePage";
// import PasswordChangePage from "../pages/PasswordChangePage";
// import PasswordChangeDonePage from "../pages/PasswordChangeDonePage";
// import PasswordResetPage from "../pages/PasswordResetPage";
// import PasswordResetDonePage from "../pages/PasswordResetDonePage";
// import PasswordResetConfirmPage from "../pages/PasswordResetConfirmPage";
// import PasswordResetCompletePage from "../pages/PasswordResetCompletePage";
import Page404 from "./pages/Page404"
import ProtectedRoute from "./components/ProtectedRoute";

import ChatSidebar from "./components/ChatSidebar"
import Footer from "./components/Footer"
import Header from "./components/Header"

import "./App.scss"
import IntroScreen from "./components/IntroScreen"


function App() {
  const location = useLocation()
  const [ isChatSidebarOpen, setIsChatSidebarOpen ] = React.useState(true)

  const showInChat = () => {
    return /^\/chat(\/|$)/.test(location.pathname)
  }
  const toggleChatSidebar = () => {
    setIsChatSidebarOpen(!isChatSidebarOpen)
  }

  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return (
      <IntroScreen onFinish={() => setShowIntro(false)} />
    )
  }


  return (
    <>
      {(showInChat() && isChatSidebarOpen) && <ChatSidebar isOpen={ isChatSidebarOpen } onClose={ toggleChatSidebar } />}
      <div className="all-content">
        <Header onToggleChatSidebar={ toggleChatSidebar } isOpen={ isChatSidebarOpen }/>
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              className="child"
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Routes>
                <Route path={routes.main.mask} element={<MainPage />} />
                <Route path={routes.api.mask} element={<APIPage />} />
                <Route
                  path={routes.chats.mask}
                  element={
                    <ProtectedRoute isAuthenticated={true}>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routes.chat.mask}
                  element={
                    <ProtectedRoute isAuthenticated={true}>
                      <ChatByIdPage />
                    </ProtectedRoute>
                  }
                />
                <Route path={routes.user.login.mask} element={< LogInPage/>} />
                <Route path={routes.user.signup.mask} element={< SignUpPage/>} />
                <Route path={routes.news.mask} element={<NewsPage />} />
                <Route path={routes.page404.mask} element={<Page404 />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        { !showInChat() && <Footer /> }
      </div>
    </>
  )
}

export default App
