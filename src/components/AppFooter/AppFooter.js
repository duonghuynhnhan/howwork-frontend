import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="https://github.com/duonghuynhnhan/howwork-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Howwork
        </a>
        <span className="ms-1">&copy; 2022.v1.0</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://facebook.com/duonghuynhnhan" target="_blank" rel="noopener noreferrer">
          Duong Huynh Nhan (Kevin Duong)
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
