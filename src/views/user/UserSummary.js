import React, { useEffect } from 'react'

function UserSummary() {
  useEffect(() => {
    document.title = 'Summary | Howwork'
  })

  return <div>UserSummary</div>
}

export default UserSummary
