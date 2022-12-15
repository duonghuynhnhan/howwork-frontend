import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { cilLockLocked } from '@coreui/icons'

import { accountService } from 'src/services'

function UserChangePassword() {
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [noti, setNoti] = useState(false)

  useEffect(() => {
    document.title = 'Change password | Howwork'
  })

  const handleChangePassword = async () => {
    if (oldPassword !== newPassword && newPassword === rePassword) {
      const login = await accountService.login({ username, password: oldPassword })
      if (login.message === 'Success') {
        const data = await accountService.changePassword(username, { password: newPassword })
        if (data.message === 'Account was updated successfully') {
          setNoti(true)
        }
      }
    }
  }

  return (
    <>
      <div
        className="bg-light d-flex flex-row align-items-center"
        style={{ marginTop: '120px', marginBottom: '40px' }}
      >
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Change Password</h1>
                    <p className="text-medium-emphasis">Input Old & New Password</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Enter Old-Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Enter New-Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Re-Enter New-Password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleChangePassword}>
                        Change Password
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
          visible={noti}
          onClose={() => {
            setNoti(false)
            navigate('/user/home')
          }}
        >
          <CModalHeader
            onClose={() => {
              setNoti(false)
              navigate('/user/home')
            }}
          >
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, your password has changed successfully!!!</CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setNoti(false)
                navigate('/user/home')
              }}
            >
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                setNoti(false)
                navigate('/user/home')
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

export default UserChangePassword
