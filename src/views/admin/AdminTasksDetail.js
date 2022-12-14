import React, { useEffect, useState } from 'react'
import {
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
  CCardText,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'
import { taskService } from 'src/services/task.service'

function AdminTasksDetail() {
  const task_id = useLocation().state
  const [task, setTask] = useState({})

  useEffect(() => {
    document.title = `${task.name} | Howwork`
  })

  useEffect(() => {
    let mounted = true
    taskService.detail(task_id).then((task) => {
      if (mounted) {
        setTask(task)
      }
    })
    return () => (mounted = false)
  }, [task_id])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                {task.name}
              </h4>
            </CCol>
            <CCardText>{task.description}</CCardText>
          </CRow>

          <br></br>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to start</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time to done</CTableHeaderCell>
                <CTableHeaderCell scope="col">File</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{task.name}</CTableDataCell>
                <CTableDataCell>{task.leader}</CTableDataCell>
                <CTableDataCell>{task.createdDate}</CTableDataCell>
                <CTableDataCell>{task.timeToStart}</CTableDataCell>
                <CTableDataCell>{task.deadline}</CTableDataCell>
                <CTableDataCell>{task.timeToDone}</CTableDataCell>
                <CTableDataCell>File</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AdminTasksDetail
