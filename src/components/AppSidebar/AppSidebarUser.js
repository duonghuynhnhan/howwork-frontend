import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CNavItem } from '@coreui/react'
import { cilHouse, cilBolt, cilNotes, cilChart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

function AppSidebarUser() {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigation = [
    {
      component: CNavItem,
      name: 'Home',
      to: '/user/home',
      icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Tasks',
      to: '/user/tasks',
      icon: <CIcon icon={cilBolt} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Projects',
      to: '/user/projects',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Summary',
      to: '/user/summary',
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

export default React.memo(AppSidebarUser)
