import React, { useEffect } from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

function UserProjects() {
  useEffect(() => {
    document.title = 'Projects | Howwork'
  })

  const projects = [
    {
      name: 'Real',
      leader: 'Perez',
      createdDate: '12/11/2022',
      timeToStart: '12/11/2022',
      deadline: '13/11/2022',
      timeToDone: '3 hours',
    },
    {
      name: 'Portugal',
      leader: 'Ronaldo',
      createdDate: '13/11/2022',
      timeToStart: '13/11/2022',
      deadline: '15/11/2022',
      timeToDone: '4 hours',
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Projects
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Late', 'Present', 'Pending'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Present'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>

          <br></br>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Leader</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to start</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to done</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projects.map((project, index) => (
                <CTableRow v-for="project in projects" key={index}>
                  <CTableDataCell>{project.name}</CTableDataCell>
                  <CTableDataCell>{project.leader}</CTableDataCell>
                  <CTableDataCell>{project.createdDate}</CTableDataCell>
                  <CTableDataCell>{project.timeToStart}</CTableDataCell>
                  <CTableDataCell>{project.deadline}</CTableDataCell>
                  <CTableDataCell>{project.timeToDone}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UserProjects
