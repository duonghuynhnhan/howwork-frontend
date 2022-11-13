import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu, cilSearch } from '@coreui/icons'

import AppHeaderDropdownUser from './AppHeaderDropdownUser'
import { logo } from '../../assets/brand/logo'

function AppHeaderUser() {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <div style={{ width: '80%', display: 'flex' }}>
          <CFormInput
            type="text"
            id="search"
            placeholder="Search everything"
            style={{ width: '40%', borderRadius: '30px' }}
          />
          <CIcon icon={cilSearch} style={{ marginLeft: '-40px', marginTop: '9px' }} height={20} />
        </div>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/user/notifications" component={NavLink}>
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdownUser />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeaderUser
