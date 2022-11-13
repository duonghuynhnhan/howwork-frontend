import React from 'react'
import PropTypes from 'prop-types'

import { AppSidebarUser, AppHeaderUser, AppContentUser, AppFooter } from '../components'

function LayoutUser() {
  return (
    <div>
      <AppSidebarUser />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeaderUser />
        <div className="body flex-grow-1 px-3">
          <AppContentUser />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

LayoutUser.propTypes = {
  auth: PropTypes.string,
}

export default LayoutUser
