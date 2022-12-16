import axios from 'axios'

const url = 'http://localhost:3100'

class ProjectReportService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/project/report`, payload)).data
  }

  async detail(project_id) {
    return (await this.api.get(`${url}/api/project/report/${project_id}`)).data
  }

  async delete(project_id) {
    return (await this.api.delete(`${url}/api/project/report/${project_id}`)).data
  }
}

export const projectReportService = new ProjectReportService()
