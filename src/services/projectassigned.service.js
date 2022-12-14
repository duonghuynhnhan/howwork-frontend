import axios from 'axios'

const url = 'http://localhost:3100'

class ProjectAssignedService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async all() {
    return (await this.api.get(`${url}/api/projects`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/project/assigned`, payload)).data
  }

  async allMember(project_id) {
    return (await this.api.get(`${url}/api/project/assigned/${project_id}`)).data
  }
}

export const projectAssignedService = new ProjectAssignedService()
