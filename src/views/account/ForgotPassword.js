import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { accountService } from 'src/services'

function ForgotPassword() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [keypass, setKeypass] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  const [visible, setVisible] = useState(false)
  const [noti, setNoti] = useState(false)

  useEffect(() => {
    document.title = 'Forgot Password | Howwork'
  }, [])

  const handleCheck = async () => {
    if (username && keypass) {
      const payload = {
        username,
        keypass,
      }

      const data = await accountService.forgotPassword(payload)
      if (data.message === 'Success') {
        setVisible(true)
      }
    } else {
      alert('Input full information, please!!!')
    }
  }

  const handleSetPassword = async () => {
    if (password === repassword && password.length > 0) {
      setUsername('')
      setKeypass('')
      const data = await accountService.changePassword(username, { password })
      if (data.message === 'Account was updated successfully') {
        setVisible(false)
        setNoti(true)
        setPassword('')
        setRepassword('')
      }
    } else {
      alert('Input again, please!!!')
    }
  }

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">
                      Input some information to get your account
                    </p>
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
                            handleCheck()
                          }
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Your key"
                        autoComplete="keypass"
                        value={keypass}
                        onChange={(e) => setKeypass(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCheck()
                          }
                        }}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleCheck}>
                        Check
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

      <>
        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false)
            setUsername('')
            setKeypass('')
          }}
        >
          <CModalHeader
            onClose={() => {
              setVisible(false)
              setKeypass('')
              setKeypass('')
            }}
          >
            <CModalTitle>Set password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <p className="text-medium-emphasis">Input your new password</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="New password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSetPassword()
                    }
                  }}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Re-enter password"
                  autoComplete="password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSetPassword()
                    }
                  }}
                />
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleSetPassword}>
              Set password
            </CButton>
          </CModalFooter>
        </CModal>
      </>

      <>
        <CModal
          visible={noti}
          onClose={() => {
            setNoti(false)
            navigate('/account/login')
          }}
        >
          <CModalHeader
            onClose={() => {
              setNoti(false)
              navigate('/account/login')
            }}
          >
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, new password is set successfully!!!</CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setNoti(false)
                navigate('/account/login')
              }}
            >
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                setNoti(false)
                navigate('/account/login')
              }}
            >
              OK
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    </>
  )
}

export default ForgotPassword
