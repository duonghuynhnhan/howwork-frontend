import React, { useEffect, useState } from 'react'
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
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import {
  projectService,
  projectCommentService,
  projectReportService,
  projectAssignedService,
  taskService,
} from 'src/services'

function UserProjectsDetail() {
  const project_id = useLocation().state
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [project, setProject] = useState({})
  const [tasks, setTasks] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [report, setReport] = useState({})
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    document.title = `${project.name} | Howwork`

    projectService.detail(project_id).then((project) => {
      setProject(project)
    })

    projectAssignedService.allMember(project_id).then((account) => {
      setAccounts(account)
    })

    let interval1 = setInterval(() => {
      taskService.all(project_id).then((task) => {
        setTasks(task)
      })
    }, 200)

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
                <b>Leader</b>: {project.fullname + ' ' + project.leader}
              </CCardText>
              <CCardText style={{ marginTop: '-10px' }}>
                <b>Description</b>: {project.description}
              </CCardText>
              <CCardText style={{ marginTop: '-10px' }}>
                <b>Members: </b>
              </CCardText>
              {accounts.map((account, index) => (
                <CCardText key={index} style={{ marginTop: '-20px' }}>
                  &emsp;{account.fullname + ' ' + account.username}
                </CCardText>
              ))}
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
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
                navigate(`/user/project/${project_id}/task/${task.id}`, {
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
            <div>
              <CCardText>{report.uploadeddate}</CCardText>
              <CCardText>{report.file}</CCardText>
            </div>
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
    </>
  )
}

export default UserProjectsDetail
