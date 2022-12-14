import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { accountService } from 'src/services/account.service'
import store from 'src/store'

function Login() {
  useEffect(() => {
    document.title = 'Login | Howwork'
  }, [])

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const login = await accountService.login({ username, password })
    if (login.message === 'Success') {
      store.dispatch({ type: 'set', username, role: login.role })
      navigate(`/${login.role}/home`)
    } else {
      alert('Username or password is invalid!!!')
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Login to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit()
                        }
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit()
                        }
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={handleSubmit}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        <CNavLink to="/account/forgot-password" component={NavLink}>
                          Forgot Password
                        </CNavLink>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
