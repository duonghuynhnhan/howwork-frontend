import React from 'react'
import PropTypes from 'prop-types'

import { AppSidebarAdmin, AppHeaderAdmin, AppContentAdmin, AppFooter } from '../components'

function LayoutAdmin() {
  return (
    <div>
      <AppSidebarAdmin />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeaderAdmin />
        <div className="body flex-grow-1 px-3">
          <AppContentAdmin />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

LayoutAdmin.propTypes = {
  auth: PropTypes.string,
}

export default LayoutAdmin
