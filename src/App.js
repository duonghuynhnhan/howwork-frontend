import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './scss/style.scss'
import { LayoutUser, LayoutAdmin } from './layout'
import { Home, Login, ForgotPassword } from './views'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  useEffect(() => {
    document.title = 'Howwork'
  })

  const type = 'user'
  const Layout = type === 'admin' ? LayoutAdmin : LayoutUser

  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/account/login" name="Login Page" element={<Login props={type} />} />
          <Route
            exact
            path="/account/forgot-password"
            name="Forgot Password Page"
            element={<ForgotPassword />}
          />
          <Route exact path="/" name="Home" element={<Home />} />
          <Route path="*" name="App" element={<Layout />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
