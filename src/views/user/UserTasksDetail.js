import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
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
  CCardText,
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'
import moment from 'moment'

import { taskService, taskCommentService, taskReportService } from 'src/services'

function UserTasksDetail() {
  const task_id = useLocation().state
  const username = useSelector((state) => state.username)

  const [tasks, setTasks] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [report, setReport] = useState()
  const [inputReport, setInputReport] = useState('')

  useEffect(() => {
    document.title = `${tasks.name} | Howwork`

    let interval1 = setInterval(() => {
      taskService.detail(task_id).then((task) => {
        setTasks(task)
      })
    }, 200)

    let interval2 = setInterval(() => {
      taskCommentService.all(task_id).then((comment) => {
        setComments(comment)
      })
    }, 200)

    let interval3 = setInterval(() => {
      taskReportService.detail(task_id).then((report) => {
        setReport(report)
      })
    }, 200)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      clearInterval(interval3)
    }
  }, [task_id, tasks.name])

  const handleAddComment = async () => {
    const payload = {
      task: task_id,
      comment,
      who: username,
      time: moment().format('DD/MM/YYYY HH:mm:ss'),
    }

    const data = await taskCommentService.create(payload)
    if (data) {
      setComment('')
    }
  }

  const handleAddReport = async () => {
    const payload = {
      task: task_id,
      file: inputReport,
      uploadeddate: moment().format('DD/MM/YYYY HH:mm:ss'),
    }
    const report = await taskReportService.create(payload)
    if (report) {
      await taskService.update(task_id, {
        completedstate: 100,
        completeddate: moment().format('DD/MM/YYYY HH:mm:ss'),
      })
      setInputReport('')
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                {tasks.name}
              </h4>
            </CCol>
            <CCardText>{tasks.description}</CCardText>
            <hr></hr>
          </CRow>

          <br></br>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
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
              <CTableRow>
                <CTableDataCell>{tasks.name}</CTableDataCell>
                <CTableDataCell>{tasks.fullname + ' ' + tasks.username}</CTableDataCell>
                <CTableDataCell>{tasks.createddate}</CTableDataCell>
                <CTableDataCell>{tasks.completeddate}</CTableDataCell>
                <CTableDataCell>{tasks.updateddate}</CTableDataCell>
                <CTableDataCell>{tasks.start}</CTableDataCell>
                <CTableDataCell style={{ color: 'lightcoral' }}>{tasks.end}</CTableDataCell>
                <CTableDataCell>{tasks.time} hours</CTableDataCell>
                <CTableDataCell>{tasks.note}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
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
                {username === tasks.username && (
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
                          taskService.update(task_id, {
                            completedstate: 0,
                            completeddate: '',
                          })
                          taskReportService.delete(report.task)
                        }}
                      >
                        <CIcon icon={cilDelete} />
                      </CButton>
                    </CCol>
                  </>
                )}
              </div>
            ) : username === tasks.username ? (
              <CFormInput
                style={{ width: '99.2%', margin: '5px' }}
                type="text"
                id="floatingInput"
                placeholder="Add report for this task..."
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
                              taskCommentService.delete(comment.id)
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

export default UserTasksDetail
