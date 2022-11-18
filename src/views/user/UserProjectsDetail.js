import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CButton,
  CNavLink,
} from '@coreui/react'

function UserProjectsDetail() {
  useEffect(() => {
    document.title = "Project's Detail | Howwork"
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
                Projects Name
              </h4>
            </CCol>
          </CRow>

          <br></br>

          {tasks.map((task, index) => (
            <CCard style={{ width: '99%', margin: '5px' }} key={index}>
              <CCardBody>
                <CCardTitle>{task.title}</CCardTitle>
                <CCardText>{task.description}</CCardText>
                <CButton>
                  <CNavLink to={`/user/projects/${index}/tasks/${index}`} component={NavLink}>
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

export default UserProjectsDetail
