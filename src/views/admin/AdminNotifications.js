import React from 'react'
import { useEffect } from 'react'

function AdminNotifications() {
  useEffect(() => {
    document.title = 'Notifications | Howwork'
  })

  return <div>Admin Notifications</div>
}

export default AdminNotifications
