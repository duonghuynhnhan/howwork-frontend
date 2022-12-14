import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { cilDelete, cilPencil } from '@coreui/icons'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

import { taskService, taskCommentService } from 'src/services'

function AdminTasksDetail() {
  const task_id = useLocation().state
  const username = useSelector((state) => state.username)

  const [tasks, setTasks] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    document.title = `${tasks.name} | Howwork`
  })

  useEffect(() => {
    taskService.detail(task_id).then((task) => {
      setTasks(task)
    })

    let interval = setInterval(() => {
      taskCommentService.all(task_id).then((comment) => {
        setComments(comment)
      })
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [task_id])

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
            {username === tasks.leader && (
              <>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="secondary" className="float-end">
                    <CIcon icon={cilPencil} />
                  </CButton>
                </CCol>
              </>
            )}
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
                <CTableDataCell>{tasks.start}</CTableDataCell>
                <CTableDataCell>{tasks.end}</CTableDataCell>
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

export default AdminTasksDetail
