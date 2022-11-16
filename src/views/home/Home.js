import { CButton, CContainer, CNavLink, CImage } from '@coreui/react'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import home from '../../assets/images/avatars/home.png'

function Home() {
  useEffect(() => {
    document.title = 'Howwork | Home'
  })

  return (
    <div>
      <CContainer fluid>
        <div>
          <div style={{ fontSize: '40px' }}>Howwork</div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-50px' }}>
            <CButton>
              <CNavLink to="/account/login" component={NavLink} style={{ height: '30px' }}>
                Login
              </CNavLink>
            </CButton>
          </div>
        </div>

        <hr></hr>

        <div>
          <CImage rounded src={home} width={1410} height={720} />
        </div>
      </CContainer>
    </div>
  )
}

export default Home
