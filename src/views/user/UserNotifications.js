import React from 'react'
import { useEffect } from 'react'

function UserNotifications() {
  useEffect(() => {
    document.title = 'Notifications | Howwork'
  })

  return <div>UserNotifications</div>
}

export default UserNotifications
