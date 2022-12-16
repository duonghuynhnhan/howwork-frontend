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
  CFormSelect,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DatePicker from 'react-datepicker'
import {
  cilAsteriskCircle,
  cilUser,
  cilPhone,
  cilBank,
  cilBirthdayCake,
  cilTags,
} from '@coreui/icons'

import { personService } from 'src/services'

function UserChangeInformation() {
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [info, setInfo] = useState({})
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

  useEffect(() => {
    document.title = 'Change Information | Howwork'

    personService.information(username).then((infor) => {
      setInfo(infor)
      setFullName(infor.fullname)
      setDOB(convertToDate(infor.dob))
      setSex(infor.sex)
      setEmail(infor.email)
      setPhone(infor.phone)
      setPosition(infor.position)
      setUnit(infor.unit)
    })
  }, [username])

  const handleConfirm = async () => {
    const payload = {
      id: info.id,
      fullname,
      dob: convertToString(dob),
      sex,
      email,
      phone,
      position,
      unit,
    }
    const data = await personService.changeInformation(username, payload)
    if (data) {
      setNoti(true)
    }
  }

  const convertToDate = (string) => {
    const [day, month, year] = string.split('/')
    return new Date(+year, +month - 1, +day)
  }

  const convertToString = (date) => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const year = date.getFullYear()

    return day + '/' + month + '/' + year
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
                    <h1>Change Information</h1>
                    <p className="text-medium-emphasis">Change your information</p>
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
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        disabled
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
                      <CButton color="success" onClick={handleConfirm}>
                        Change Information
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
            navigate('/user/information')
          }}
        >
          <CModalHeader
            onClose={() => {
              setNoti(false)
              navigate('/user/information')
            }}
          >
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, Your information has updated successfully!!!</CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setNoti(false)
                navigate('/user/information')
              }}
            >
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                setNoti(false)
                navigate('/user/information')
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

export default UserChangeInformation
