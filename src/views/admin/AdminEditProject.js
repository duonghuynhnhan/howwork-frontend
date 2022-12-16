import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DatePicker from 'react-datepicker'
import {
  cilTags,
  cilText,
  cilListFilter,
  cilDataTransferDown,
  cilDataTransferUp,
  cilAvTimer,
  cilNotes,
} from '@coreui/icons'
import { MultiSelect } from 'react-multi-select-component'
import moment from 'moment'

import { projectService, projectAssignedService, accountService } from 'src/services'

function AdminEditProject() {
  const project_id = useLocation().state
  const [accountsAssign, setAccountsAssign] = useState([])
  const [accounts, setAccounts] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [time, setTime] = useState()
  const [note, setNote] = useState('')
  const [selected, setSelected] = useState([])

  const [noti, setNoti] = useState(false)
  const navigate = useNavigate()

  let optionsAssign = []
  let optionsAccount = []
  for (var i = 0; i < accountsAssign.length; i++) {
    optionsAssign.push({
      label: accountsAssign[i].fullname + ' ' + accountsAssign[i].username,
      value: accountsAssign[i].username,
    })
  }

  for (var j = 0; j < accounts.length; j++) {
    optionsAccount.push({
      label: accounts[j].fullname + ' ' + accounts[j].username,
      value: accounts[j].username,
    })
  }

  const convertToDate = (string) => {
    const [dateValues, timeValues] = string.split(' ')
    const [day, month, year] = dateValues.split('/')
    const [hours, minutes, seconds] = timeValues.split(':')

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds)
  }

  const convertToString = (date) => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
  }

  const listToString = (lst) => {
    let str = ''
    lst.map((item) => (str += item.label + '*'))

    return str
  }

  const objectToString = (object) => {
    return '' + object.label + '*'
  }

  const handleEdit = async () => {
    if (name && description && startDate && endDate && time && note) {
      const payload = {
        name,
        description,
        start: convertToString(startDate),
        end: convertToString(endDate),
        time,
        updateddate: moment().format('DD/MM/YYYY HH:mm:ss'),
        note,
      }
      const data = await projectService.update(project_id, payload)
      if (selected.length > 0) {
        selected.map(async (select) => {
          await projectAssignedService.create({
            project: project_id,
            user: select.value,
          })
        })
      }
      if (data) setNoti(true)
    } else {
      alert('Input full information, please!!!')
    }
  }

  useEffect(() => {
    projectService.detail(project_id).then((project) => {
      setName(project.name)
      setDescription(project.description)
      setStartDate(convertToDate(project.start))
      setEndDate(convertToDate(project.end))
      setTime(project.time)
      setNote(project.note)
    })

    projectAssignedService.allMember(project_id).then((account) => {
      setAccountsAssign(account)
    })

    accountService.all().then((account) => {
      setAccounts(account)
    })
  }, [project_id])

  const options = optionsAccount.filter(
    (account) => !listToString(optionsAssign).includes(objectToString(account)),
  )

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
                    <h1>Edit Project</h1>
                    <p className="text-medium-emphasis">Update this project</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Project name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilListFilter} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Discription"
                        autoComplete="discription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilDataTransferDown} />
                      </CInputGroupText>
                      <div>
                        <DatePicker
                          selected={startDate}
                          minDate={new Date()}
                          onChange={(date) => {
                            setStartDate(date)
                          }}
                          placeholderText="Start Date"
                          dateFormat="dd/MM/yyyy HH:mm:ss"
                          showTimeSelect
                          timeFormat="HH:mm:ss"
                        />
                      </div>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilDataTransferUp} />
                      </CInputGroupText>
                      <div>
                        <DatePicker
                          selected={endDate}
                          minDate={startDate}
                          placeholderText="End Date"
                          onChange={(date) => setEndDate(date)}
                          dateFormat="dd/MM/yyyy HH:mm:ss"
                          showTimeSelect
                          timeFormat="HH:mm:ss"
                        />
                      </div>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilAvTimer} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Time"
                        autoComplete="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilNotes} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Note"
                        autoComplete="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilTags} />
                      </CInputGroupText>
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select account"
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleEdit}>
                        Save changes
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
            navigate(`/admin/project/${project_id}`, { replace: true, state: project_id })
          }}
        >
          <CModalHeader
            onClose={() => {
              setNoti(false)
              navigate(`/admin/project/${project_id}`, { replace: true, state: project_id })
            }}
          >
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, information of project has updated successfully!!!</CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setNoti(false)
                navigate(`/admin/project/${project_id}`, { replace: true, state: project_id })
              }}
            >
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                setNoti(false)
                navigate(`/admin/project/${project_id}`, { replace: true, state: project_id })
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

export default AdminEditProject
