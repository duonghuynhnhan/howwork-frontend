import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CModalHeader,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilTags,
  cilText,
  cilListFilter,
  cilDataTransferDown,
  cilDataTransferUp,
  cilNotes,
  cilAvTimer,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import { projectService, accountService, projectAssignedService } from 'src/services'

function AdminProjects() {
  const navigate = useNavigate()
  const username = useSelector((state) => state.username)

  const [visible, setVisible] = useState(false)
  const [noti, setNoti] = useState(false)

  const [projects, setProjects] = useState([])
  const [accounts, setAccounts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [time, setTime] = useState()
  const [note, setNote] = useState('')
  const [selected, setSelected] = useState([])

  let options = []
  for (var i = 0; i < accounts.length; i++) {
    options.push({
      label: accounts[i].fullname + ' ' + accounts[i].username,
      value: accounts[i].username,
    })
  }

  useEffect(() => {
    document.title = 'Projects | Howwork'

    projectService.all().then((project) => {
      setProjects(project)
    })

    accountService.all().then((account) => {
      setAccounts(account)
    })
  }, [projects, accounts])

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

  const clear = () => {
    setVisible(false)
    setName('')
    setDescription('')
    setStartDate(new Date())
    setEndDate(new Date())
    setTime()
    setNote('')
    setSelected([])
  }

  const handleCreateProject = async () => {
    if (name && description && startDate && endDate && time && note && selected.length > 0) {
      const payload = {
        name,
        description,
        start: convertToString(startDate),
        end: convertToString(endDate),
        time,
        createddate: moment().format('DD/MM/YYYY HH:mm:ss'),
        completeddate: null,
        updateddate: null,
        leader: username,
        completedstate: 0,
        note,
      }

      const create = await projectService.create(payload)
      selected.map(async (select) => {
        const data = { project: create.id, user: select.value }
        await projectAssignedService.create(data)
      })

      if (create) {
        clear()
        setNoti(true)
      }
    } else {
      alert('Input full information, please!!!')
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Projects
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end" onClick={() => setVisible(!visible)}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Completed', 'Present', 'Pending'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    style={{
                      background:
                        value === 'Completed'
                          ? 'aqua'
                          : value === 'Present'
                          ? 'lightcoral'
                          : 'gainsboro',
                      color: 'black',
                    }}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>

          <br></br>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Leader</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Updated Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to start</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to done</CTableHeaderCell>
                <CTableHeaderCell scope="col">Note</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projects.map((project, index) => (
                <CTableRow
                  key={project.id}
                  onClick={() => {
                    navigate(`/admin/project/${project.id}`, { replace: true, state: project.id })
                  }}
                  style={{
                    background: project.completeddate
                      ? 'aqua'
                      : convertToDate(project.end) > new Date() &&
                        convertToDate(project.start) < new Date()
                      ? 'lightcoral'
                      : 'gainsboro',
                  }}
                >
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{project.name}</CTableDataCell>
                  <CTableDataCell>{project.fullname + ' ' + project.leader}</CTableDataCell>
                  <CTableDataCell>{project.createddate}</CTableDataCell>
                  <CTableDataCell>{project.completeddate}</CTableDataCell>
                  <CTableDataCell>{project.updateddate}</CTableDataCell>
                  <CTableDataCell>{project.start}</CTableDataCell>
                  <CTableDataCell>{project.end}</CTableDataCell>
                  <CTableDataCell>{project.time} hours</CTableDataCell>
                  <CTableDataCell>{project.note}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <>
        <CModal
          visible={visible}
          onClose={() => {
            clear()
            setVisible(false)
          }}
        >
          <CModalHeader
            onClose={() => {
              clear()
              setVisible(false)
            }}
          >
            <CModalTitle>Add project</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <p className="text-medium-emphasis">Input some information to create a new project</p>
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
                  placeholder="Description"
                  autoComplete="description"
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
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                clear()
                setVisible(false)
              }}
            >
              Close
            </CButton>
            <CButton color="primary" onClick={handleCreateProject}>
              Create project
            </CButton>
          </CModalFooter>
        </CModal>
      </>

      <>
        <CModal visible={noti} onClose={() => setNoti(false)}>
          <CModalHeader onClose={() => setNoti(false)}>
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, project is created successfully!!!</CModalBody>
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

export default AdminProjects
