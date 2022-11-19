import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
import { cilAsteriskCircle, cilUser, cilPhone, cilBank } from '@coreui/icons'

function UserInformation() {
  useEffect(() => {
    document.title = 'Information | Howwork'
  })

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
                  <h1>Personal Information</h1>
                  <p className="text-medium-emphasis">Change your information</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="ID" autoComplete="id" value={'B1910676'} disabled />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full name"
                      autoComplete="fullname"
                      value={'Kevin Duong'}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={'duonghuynhnhan@outlook.com'}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone"
                      autoComplete="phone"
                      value={'0354984001'}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAsteriskCircle} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Position"
                      autoComplete="position"
                      value={'Student'}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBank} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Unit"
                      autoComplete="unit"
                      value={'College of Information Technology'}
                      disabled
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton>
                      <CNavLink to="/user/change-information" component={NavLink}>
                        Change Your Information
                      </CNavLink>
                    </CButton>
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

export default UserInformation
