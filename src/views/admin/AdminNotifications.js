import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CNavLink } from '@coreui/react'

function AdminNotifications() {
  useEffect(() => {
    document.title = 'Notifications | Howwork'
  })

  const notifications = [
    { title: 'DB vừa cập nhật một dự án mới', description: 'Mọi người đừng tin nhaaa' },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h4 id="traffic" className="card-title mb-0">
            Notifications
          </h4>

          <br></br>

          {notifications.map((task, index) => (
            <CCard style={{ width: '99%', margin: '5px' }} key={index}>
              <CCardBody>
                <CCardTitle>{task.title}</CCardTitle>
                <CCardText>{task.description}</CCardText>
                <CButton>
                  <CNavLink to={`/admin/notifications/${index + 1}`} component={NavLink}>
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

export default AdminNotifications
