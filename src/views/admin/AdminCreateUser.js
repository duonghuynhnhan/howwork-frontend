import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAsteriskCircle, cilUser, cilPhone, cilBank } from '@coreui/icons'

function AdminCreateUser() {
  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ marginTop: '75px', marginBottom: '40px' }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Create new User</h1>
                  <p className="text-medium-emphasis">Create new user account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="ID and Username" autoComplete="ID" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Full name" autoComplete="fullname" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Phone" autoComplete="phone" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAsteriskCircle} />
                    </CInputGroupText>
                    <CFormInput placeholder="Position" autoComplete="position" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBank} />
                    </CInputGroupText>
                    <CFormInput placeholder="Unit" autoComplete="unit" />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create User Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AdminCreateUser
