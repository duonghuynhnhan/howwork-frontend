import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CNavItem } from '@coreui/react'
import { cilHouse, cilStar, cilNotes, cilCommand, cilChart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

const navigation = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/admin/home',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Important',
    to: '/admin/important',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Project',
    to: '/admin/projects',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Task',
    to: '/admin/tasks',
    icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Summary',
    to: '/admin/summary',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
]

function AppSidebarAdmin() {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebarAdmin)
