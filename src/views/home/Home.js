import { CButton, CContainer, CHeaderNav, CNavItem, CNavLink } from '@coreui/react'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  useEffect(() => {
    document.title = 'Howwork'
  })
  return (
    <div>
      <CContainer fluid>
        <h2>Homepage - howwork</h2>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CButton>
              <CNavLink to="/account/login" component={NavLink}>
                Login
              </CNavLink>
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton color="secondary">
              <CNavLink to="/account/forgot-password" component={NavLink}>
                Forgot password
              </CNavLink>
            </CButton>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </div>
  )
}

export default Home
