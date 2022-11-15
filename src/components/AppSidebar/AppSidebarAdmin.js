import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CNavItem } from '@coreui/react'
import { cilHouse, cilNotes, cilChart, cilUserFollow, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

function AppSidebarAdmin() {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigation = [
    {
      component: CNavItem,
      name: 'Home',
      to: '/admin/home',
      icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Project',
      to: '/admin/projects',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Create User',
      to: '/admin/create-user',
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Create Admin',
      to: '/admin/create-admin',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Summary',
      to: '/admin/summary',
      icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    },
  ]

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
