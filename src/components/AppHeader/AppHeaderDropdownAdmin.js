import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from '@coreui/react'
import { cilInfo, cilLockLocked, cilKeyboard, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

import avatar8 from '../../assets/images/avatars/8.jpg'

function AppHeaderDropdownAdmin() {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/admin/information" component={NavLink}>
            <CIcon icon={cilInfo} className="me-2" />
            Information
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/admin/change-password" component={NavLink}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Change password
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/admin/change-key" component={NavLink}>
            <CIcon icon={cilKeyboard} className="me-2" />
            Change key
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/" component={NavLink}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownAdmin
