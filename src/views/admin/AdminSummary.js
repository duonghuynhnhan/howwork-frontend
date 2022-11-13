import React, { useEffect } from 'react'

function AdminSummary() {
  useEffect(() => {
    document.title = 'Summary | Howwork'
  })

  return <div>AdminSummary</div>
}

export default AdminSummary
