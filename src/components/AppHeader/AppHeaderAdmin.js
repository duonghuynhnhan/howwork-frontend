import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler, CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilSearch } from '@coreui/icons'

import AppHeaderDropdownAdmin from './AppHeaderDropdownAdmin'

function AppHeaderAdmin() {
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
        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdownAdmin />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeaderAdmin
