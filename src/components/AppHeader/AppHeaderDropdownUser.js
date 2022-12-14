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

import store from 'src/store'
import avatar8 from '../../assets/images/avatars/10.jpg'

function AppHeaderDropdownUser() {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/user/information" component={NavLink}>
            <CIcon icon={cilInfo} className="me-2" />
            Information
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/user/change-password" component={NavLink}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Change password
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink to="/user/change-key" component={NavLink}>
            <CIcon icon={cilKeyboard} className="me-2" />
            Change key
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem style={{ display: 'flex' }}>
          <CNavLink
            to="/"
            component={NavLink}
            onClick={() => {
              store.dispatch({ type: 'set', username: null, role: null })
            }}
          >
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownUser
