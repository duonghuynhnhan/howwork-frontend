import axios from 'axios'

const url = 'http://localhost:3100'

class TaskReportService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/task/report`, payload)).data
  }

  async detail(task_id) {
    return (await this.api.get(`${url}/api/task/report/${task_id}`)).data
  }

  async delete(task_id) {
    return (await this.api.delete(`${url}/api/task/report/${task_id}`)).data
  }
}

export const taskReportService = new TaskReportService()
