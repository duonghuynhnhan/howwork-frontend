import React, { useEffect, useState } from 'react'
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
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import CIcon from '@coreui/icons-react'
import {
  cilAsteriskCircle,
  cilUser,
  cilPhone,
  cilBank,
  cilTags,
  cilBirthdayCake,
} from '@coreui/icons'

import { personService } from 'src/services'

function AdminCreateUser() {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [dob, setDOB] = useState(new Date())
  const [sex, setSex] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [position, setPosition] = useState('')
  const [unit, setUnit] = useState('')
  const [noti, setNoti] = useState(false)

  const sexs = ['Sex', { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]
  const positions = [
    'Position',
    { label: 'Student', value: 'Student' },
    { label: 'Lecturer', value: 'Lecturer' },
    { label: 'Dean', value: 'Dean' },
    { label: 'Assistant Dean', value: 'Assistant Dean' },
    { label: 'Director', value: 'Director' },
    { label: 'Assistant Director', value: 'Assistant Director' },
    { label: 'Head of Department', value: 'Head of Department' },
    { label: 'Deputy Head of Department', value: 'Deputy Head of Department' },
    { label: 'Others', value: 'Others' },
  ]
  const units = [
    'Unit',
    { label: 'Faculty of Information Technology', value: 'Faculty of Information Technology' },
    { label: 'Faculty of Software Technology', value: 'Faculty of Software Technology' },
    { label: 'Faculty of Information System', value: 'Faculty of Information System' },
    {
      label: 'Faculty of Computer Networking and Communication',
      value: 'Faculty of Computer Networking and Communication',
    },
    { label: 'Faculty of Computer Science', value: 'Faculty of Computer Science' },
    { label: 'Faculty of Multimedia Communication', value: 'Faculty of Multimedia Communication' },
    {
      label: 'Office of College of Information Communication & Technology',
      value: 'Office of College of Information Communication & Technology',
    },
    {
      label: 'College of Information Communication & Technology',
      value: 'College of Information Communication & Technology',
    },
    {
      label: 'Electronic and Informatics Center',
      value: 'Electronic and Informatics Center',
    },
    { label: 'Others', value: 'Others' },
  ]

  const convertToString = (date) => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const year = date.getFullYear()

    return day + '/' + month + '/' + year
  }

  useEffect(() => {
    document.title = 'Create User | Howwork'
  })

  const handleCreate = async () => {
    const payload = {
      id,
      fullname,
      dob: convertToString(dob),
      sex,
      email,
      phone,
      position,
      unit,
      username,
      password: username,
      keypass: username,
      role: 'user',
    }

    const data = await personService.create(payload)
    if (data) {
      setNoti(true)
      setId('')
      setUsername('')
      setFullName('')
      setDOB(new Date())
      setEmail('')
      setSex('')
      setPhone('')
      setPosition('')
      setUnit('')
    }
  }

  return (
    <>
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
                      <CFormInput
                        placeholder="ID"
                        autoComplete="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilBirthdayCake} />
                      </CInputGroupText>
                      <div>
                        <DatePicker
                          selected={dob}
                          onChange={(date) => {
                            setDOB(date)
                          }}
                          placeholderText="Date of birth"
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Full name"
                        autoComplete="fullname"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilTags} />
                      </CInputGroupText>
                      <CFormSelect
                        options={sexs}
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
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
                        options={positions}
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilBank} />
                      </CInputGroupText>
                      <CFormSelect
                        options={units}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleCreate}>
                        Create User Account
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
        <CModal visible={noti} onClose={() => setNoti(false)}>
          <CModalHeader onClose={() => setNoti(false)}>
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, new User Account has created successfully!!!</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setNoti(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={() => setNoti(false)}>
              OK
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    </>
  )
}

export default AdminCreateUser
