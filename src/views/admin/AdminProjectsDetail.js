import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CButton,
  CFormInput,
  CModalHeader,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilDelete,
  cilTags,
  cilText,
  cilListFilter,
  cilDataTransferDown,
  cilDataTransferUp,
  cilNotes,
  cilAvTimer,
} from '@coreui/icons'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {
  projectService,
  projectCommentService,
  projectAssignedService,
  projectReportService,
  taskService,
  taskAssignedService,
} from 'src/services'

function AdminProjectsDetail() {
  const project_id = useLocation().state
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [project, setProject] = useState({})
  const [tasks, setTasks] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [report, setReport] = useState()
  const [inputReport, setInputReport] = useState('')
  const [accounts, setAccounts] = useState([])

  const [visible, setVisible] = useState(false)
  const [noti, setNoti] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [time, setTime] = useState()
  const [account, setAccount] = useState()
  const [note, setNote] = useState('')

  let options = []
  for (var i = 0; i < accounts.length; i++) {
    options.push({
      label: accounts[i].fullname + ' ' + accounts[i].username,
      value: accounts[i].username,
    })
  }

  useEffect(() => {
    document.title = `${project.name} | Howwork`

    projectService.detail(project_id).then((project) => {
      setProject(project)
    })

    let interval1 = setInterval(() => {
      taskService.all(project_id).then((task) => {
        setTasks(task)
      })
    }, 200)

    projectAssignedService.allMember(project_id).then((account) => {
      setAccounts(account)
    })

    let interval2 = setInterval(() => {
      projectCommentService.all(project_id).then((comment) => {
        setComments(comment)
      })
    }, 200)

    let interval3 = setInterval(() => {
      projectReportService.detail(project_id).then((report) => {
        setReport(report)
      })
    }, 200)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      clearInterval(interval3)
    }
  }, [project_id, project.name, comment])

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

  const handleAddComment = async () => {
    const payload = {
      project: project_id,
      comment,
      who: username,
      time: moment().format('DD/MM/YYYY HH:mm:ss'),
    }

    const data = await projectCommentService.create(payload)
    if (data) {
      setComment('')
    }
  }

  const handleAddReport = async () => {
    const payload = {
      project: project_id,
      file: inputReport,
      uploadeddate: moment().format('DD/MM/YYYY HH:mm:ss'),
    }
    const report = await projectReportService.create(payload)

    if (report) {
      await projectService.update(project_id, {
        completedstate: 100,
        completeddate: moment().format('DD/MM/YYYY HH:mm:ss'),
      })
      setInputReport('')
    }
  }

  const clear = () => {
    setVisible(false)
    setName('')
    setDescription('')
    setStartDate(new Date())
    setEndDate(new Date())
    setTime()
    setNote('')
    setAccount()
  }

  const handleCreate = async () => {
    const payload = {
      name,
      description,
      memberof: project_id,
      start: convertToString(startDate),
      end: convertToString(endDate),
      time,
      createddate: moment().format('DD/MM/YYYY HH:mm:ss'),
      completeddate: null,
      updateddate: null,
      completedstate: 0,
      note,
    }

    const create = await taskService.create(payload)
    const data = { task: create.id, user: account }
    const assigned = await taskAssignedService.create(data)
    if (create && assigned) {
      setNoti(true)
      clear()
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                {project.name}
              </h4>
              <CCardText style={{ color: 'coral' }}>{'(FROM ' + project.start + ')'}</CCardText>
              <CCardText style={{ marginTop: '-20px', color: 'red' }}>
                {'(DEADLINE ' + project.end + ')'}
              </CCardText>
              <CCardText style={{ marginTop: '-10px' }}>
                <b>Description</b>: {project.description}
              </CCardText>
              <CCardText>
                <b>Members: </b>
              </CCardText>
              {accounts.map((account, index) => (
                <CCardText key={index} style={{ marginTop: '-20px' }}>
                  &emsp;{account.fullname + ' ' + account.username}
                </CCardText>
              ))}
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {username === project.leader && (
                <>
                  <CButton
                    color="primary"
                    className="float-end"
                    onClick={() => {
                      setVisible(true)
                    }}
                  >
                    <CIcon icon={cilPlus} />
                  </CButton>
                  <CButton color="secondary" className="float-end">
                    <CIcon
                      icon={cilPencil}
                      onClick={() => {
                        navigate(`/admin/project/${project_id}/edit`, {
                          replace: true,
                          state: project.id,
                        })
                      }}
                    />
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
                </>
              )}
            </CCol>
            <hr></hr>
          </CRow>

          <br></br>

          {tasks.map((task) => (
            <CCard
              style={{
                width: '99%',
                margin: '5px',
                background: task.completeddate
                  ? 'aqua'
                  : convertToDate(task.end) > new Date() && convertToDate(task.start) < new Date()
                  ? 'lightcoral'
                  : 'gainsboro',
              }}
              key={task.id}
              onClick={() => {
                navigate(`/admin/project/${project_id}/task/${task.id}`, {
                  replace: true,
                  state: task.id,
                })
              }}
            >
              <CCardBody>
                <CCardTitle>{task.name}</CCardTitle>
                <CCardText>{task.description}</CCardText>
              </CCardBody>
            </CCard>
          ))}
        </CCardBody>
      </CCard>

      <>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  Report
                </h4>
              </CCol>
            </CRow>
            <br></br>

            {report ? (
              <div>
                <CCardText>{report.uploadeddate}</CCardText>
                <CCardText>{report.file}</CCardText>
                {username === project.leader && (
                  <>
                    <CCol
                      sm={7}
                      className="d-none d-md-block"
                      style={{ marginLeft: '450px', marginTop: '-40px' }}
                    >
                      <CButton
                        color="danger"
                        className="float-end"
                        onClick={() => {
                          projectService.update(project_id, {
                            completedstate: 0,
                            completeddate: '',
                          })
                          projectReportService.delete(report.project)
                        }}
                      >
                        <CIcon icon={cilDelete} />
                      </CButton>
                    </CCol>
                  </>
                )}
              </div>
            ) : username === project.leader ? (
              <CFormInput
                style={{ width: '99.2%', margin: '5px' }}
                type="text"
                id="floatingInput"
                placeholder="Add report for this project..."
                value={inputReport}
                onChange={(e) => {
                  setInputReport(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputReport.length > 0) {
                    handleAddReport()
                  }
                }}
              />
            ) : (
              <Fragment></Fragment>
            )}
          </CCardBody>
        </CCard>
      </>

      <>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  Comments
                </h4>
              </CCol>
            </CRow>
            <br></br>
            {comments.map((comment) => (
              <>
                <CCard key={comment.id} style={{ margin: '5px' }}>
                  <CRow>
                    <CCol sm={5}>
                      <CCardBody>
                        <CCardText>{comment.fullname + ' ' + comment.who}</CCardText>
                        <CCardText style={{ marginTop: '-20px' }}>{comment.time}</CCardText>
                        <CCardText>{comment.comment}</CCardText>
                      </CCardBody>
                    </CCol>
                    {username === comment.who && (
                      <>
                        <CCol sm={7} className="d-none d-md-block">
                          <CButton
                            color="danger"
                            className="float-end"
                            onClick={() => {
                              projectCommentService.delete(comment.id)
                            }}
                          >
                            <CIcon icon={cilDelete} />
                          </CButton>
                        </CCol>
                      </>
                    )}
                  </CRow>
                </CCard>
              </>
            ))}

            <CFormInput
              style={{ width: '99.2%', margin: '5px' }}
              type="text"
              id="floatingInput"
              placeholder="Your comment..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && comment.length > 0) {
                  handleAddComment()
                }
              }}
            />
          </CCardBody>
        </CCard>
      </>

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
            <CModalTitle>Add task</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <p className="text-medium-emphasis">Input some information to create a new task</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Task name"
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
                <CFormSelect
                  options={options}
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
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
            <CButton color="primary" onClick={handleCreate}>
              Create task
            </CButton>
          </CModalFooter>
        </CModal>
      </>

      <>
        <CModal visible={noti} onClose={() => setNoti(false)}>
          <CModalHeader onClose={() => setNoti(false)}>
            <CModalTitle>Notifications</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, task is created successfully!!!</CModalBody>
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

export default AdminProjectsDetail
