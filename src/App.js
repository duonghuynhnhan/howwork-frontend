import React, { Fragment, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

  let Layout = Fragment
  const role = useSelector((state) => state.role)
  if (role === 'admin') Layout = LayoutAdmin
  else if (role === 'user') Layout = LayoutUser

  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/account/login" name="Login Page" element={<Login />} />
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
