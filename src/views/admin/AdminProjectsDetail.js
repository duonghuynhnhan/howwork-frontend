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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilDelete } from '@coreui/icons'
import moment from 'moment'

import { projectService, taskService, projectCommentService } from 'src/services'

function AdminProjectsDetail() {
  const project_id = useLocation().state
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [project, setProject] = useState({})
  const [tasks, setTasks] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    document.title = `${project.name} | Howwork`

    projectService.detail(project_id).then((project) => {
      setProject(project)
    })

    taskService.all(project_id).then((task) => {
      setTasks(task)
    })

    let interval = setInterval(() => {
      projectCommentService.all(project_id).then((comment) => {
        setComments(comment)
      })
      console.log('ok')
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [project_id, project.name, comment])

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
              <CCardText>{project.description}</CCardText>
            </CCol>
            {username === project.leader && (
              <>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilPlus} />
                  </CButton>
                  <CButton color="secondary" className="float-end">
                    <CIcon icon={cilPencil} />
                  </CButton>
                </CCol>
              </>
            )}
          </CRow>

          <br></br>

          {tasks.map((task) => (
            <CCard
              style={{ width: '99%', margin: '5px' }}
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

export default AdminProjectsDetail
