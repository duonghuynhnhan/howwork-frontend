import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CNavLink,
  CCol,
  CButtonGroup,
  CRow,
} from '@coreui/react'

function UserTasks() {
  useEffect(() => {
    document.title = 'Tasks| Howwork'
  })

  const tasks = [
    { title: 'Mua Chupomoting', description: 'Thương lượng cho khôn khéo nha ' },
    { title: 'Bán A5 đi', description: 'Lấy đủ vốn là được' },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Tasks
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Late', 'Present', 'Pending'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Present'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>

          <br></br>

          {tasks.map((task, index) => (
            <CCard style={{ width: '99%', margin: '5px' }} key={index}>
              <CCardBody>
                <CCardTitle>{task.title}</CCardTitle>
                <CCardText>{task.description}</CCardText>
                <CButton>
                  <CNavLink to={`/user/project/${index}/task/${index}`} component={NavLink}>
                    Click to view
                  </CNavLink>
                </CButton>
              </CCardBody>
            </CCard>
          ))}
        </CCardBody>
      </CCard>
    </>
  )
}

export default UserTasks
