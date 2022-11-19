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
  CFormSelect,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAsteriskCircle, cilUser, cilPhone, cilBank } from '@coreui/icons'

function UserChangeInformation() {
  useEffect(() => {
    document.title = 'Change Information | Howwork'
  })

  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('Kevin Duong')
  const [email, setEmail] = useState('duonghuynhnhan@outlook.com')
  const [phone, setPhone] = useState('0354984001')
  const [position, setPosition] = useState('Student')
  const [unit, setUnit] = useState('College of Information Technology')

  const navigate = useNavigate()

  const handleConfirm = () => {
    setVisible(false)
    navigate('/user/information')
  }

  const optionsPosition = [
    { label: 'Student', value: 'STU' },
    { label: 'Lecturer', value: 'LEC' },
    { label: 'Head of Department', value: 'HOD' },
    { label: 'Deputy Head of Department', value: 'DHD' },
    { label: 'Dean', value: 'DEA' },
    { label: 'Assistant Dean', value: 'ASD' },
    { label: 'Principal', value: 'PRI' },
    { label: 'Deputy Principal', value: 'DPR' },
  ]

  const optionsUnit = [
    {
      label: 'College of Information Communication & Technology',
      value: 'CICT',
    },
    { label: 'Faculty of Information Technology', value: 'FIT' },
    { label: 'Faculty of Software Engineering', value: 'FSE' },
    { label: 'Faculty of Information Systems', value: 'FIS' },
    {
      label: 'Faculty of Computer Networking and Communication',
      value: 'FCNC',
    },
    { label: 'Faculty of Computer Sciences', value: 'FCS' },
    { label: 'Faculty of Multimedia Communication', value: 'FMC' },
    {
      label: 'Office of College of Information Communication & Technology',
      value: 'OCICT',
    },
  ]

  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ marginTop: '55px', marginBottom: '40px' }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Change Your Personal Information</h1>
                  <p className="text-medium-emphasis">Change your information</p>

                  <CInputGroup className="mb-3">
                    <p className="text-medium-emphasis">Avatar:</p>
                    <input type={'file'}></input>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full name"
                      autoComplete="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone"
                      autoComplete="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAsteriskCircle} />
                    </CInputGroupText>
                    <CFormSelect
                      value={position}
                      options={optionsPosition}
                      onChange={(e) => {
                        console.log(position)
                        setPosition(e.target.value)
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBank} />
                    </CInputGroupText>
                    <CFormSelect
                      value={unit}
                      options={optionsUnit}
                      onChange={(e) => {
                        console.log(unit)
                        setUnit(e.target.value)
                      }}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={() => setVisible(!visible)}>
                      Confirm
                    </CButton>
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader>
                        <CModalTitle>Change information</CModalTitle>
                      </CModalHeader>
                      <CModalBody>Are you sure you want to change your information?</CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                          Cancel
                        </CButton>
                        <CButton color="primary" onClick={handleConfirm}>
                          Save changes
                        </CButton>
                      </CModalFooter>
                    </CModal>
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

export default UserChangeInformation
