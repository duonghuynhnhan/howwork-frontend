import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCol,
  CButtonGroup,
  CRow,
} from '@coreui/react'

import { taskAssignedService } from 'src/services'

function UserTasks() {
  const username = useSelector((state) => state.username)
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    document.title = 'My Tasks | Howwork'

    let interval = setInterval(() => {
      taskAssignedService.all(username).then((task) => {
        setTasks(task)
      })
    }, 200)

    return () => {
      clearInterval(interval)
    }
  })

  const convertToDate = (string) => {
    const [dateValues, timeValues] = string.split(' ')
    const [day, month, year] = dateValues.split('/')
    const [hours, minutes, seconds] = timeValues.split(':')

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                My Tasks
              </h4>
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
                navigate(`/user/project/${task.memberof}/task/${task.id}`, {
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
    </>
  )
}

export default UserTasks
