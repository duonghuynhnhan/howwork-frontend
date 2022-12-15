import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import {
  cilAsteriskCircle,
  cilUser,
  cilPhone,
  cilBank,
  cilBirthdayCake,
  cilTags,
} from '@coreui/icons'

import { personService } from 'src/services'

function UserInformation() {
  const username = useSelector((state) => state.username)

  const [info, setInfo] = useState({})

  useEffect(() => {
    document.title = 'Information | Howwork'

    let interval = setInterval(() => {
      personService.information(username).then((info) => setInfo(info))
    }, 200)

    return () => clearInterval(interval)
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="ID" autoComplete="id" value={info.id} disabled />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full name"
                      autoComplete="fullname"
                      value={info.fullname}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBirthdayCake} />
                    </CInputGroupText>
                    <CFormInput placeholder="DOB" autoComplete="dob" value={info.dob} disabled />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilTags} />
                    </CInputGroupText>
                    <CFormInput placeholder="Sex" autoComplete="sex" value={info.sex} disabled />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={info.email}
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
                      value={info.phone}
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
                      value={info.position}
                      disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBank} />
                    </CInputGroupText>
                    <CFormInput placeholder="Unit" autoComplete="unit" value={info.unit} disabled />
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
