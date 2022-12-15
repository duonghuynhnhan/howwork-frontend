import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

import { projectAssignedService } from 'src/services'

function UserProjects() {
  const navigate = useNavigate()
  const username = useSelector((state) => state.username)

  const [projects, setProjects] = useState([])

  useEffect(() => {
    document.title = 'My Projects | Howwork'

    let interval1 = setInterval(() => {
      projectAssignedService.all(username).then((project) => {
        setProjects(project)
      })
    }, 200)

    return () => clearInterval(interval1)
  })

  const convertToDate = (string) => {
    const [dateValues, timeValues] = string.split(' ')
    const [day, month, year] = dateValues.split('/')
    const [hours, minutes, seconds] = timeValues.split(':')

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                My Projects
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Completed', 'Present', 'Pending'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    style={{
                      background:
                        value === 'Completed'
                          ? 'aqua'
                          : value === 'Present'
                          ? 'lightcoral'
                          : 'gainsboro',
                    }}
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
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Leader</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to start</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to done</CTableHeaderCell>
                <CTableHeaderCell scope="col">Note</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projects.map((project, index) => (
                <CTableRow
                  key={project.id}
                  onClick={() => {
                    navigate(`/user/project/${project.id}`, { replace: true, state: project.id })
                  }}
                  style={{
                    background: project.completeddate
                      ? 'aqua'
                      : convertToDate(project.end) > new Date() &&
                        convertToDate(project.start) < new Date()
                      ? 'lightcoral'
                      : 'gainsboro',
                  }}
                >
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{project.name}</CTableDataCell>
                  <CTableDataCell>{project.fullname + ' ' + project.leader}</CTableDataCell>
                  <CTableDataCell>{project.createddate}</CTableDataCell>
                  <CTableDataCell>{project.completeddate}</CTableDataCell>
                  <CTableDataCell>{project.start}</CTableDataCell>
                  <CTableDataCell>{project.end}</CTableDataCell>
                  <CTableDataCell>{project.time} hours</CTableDataCell>
                  <CTableDataCell>{project.note}</CTableDataCell>
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
