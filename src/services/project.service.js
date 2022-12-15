import axios from 'axios'

const url = 'http://localhost:3100'

class ProjectService {
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

  async detail(project_id) {
    return (await this.api.get(`${url}/api/project/${project_id}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/project`, payload)).data
  }

  async update(project_id, payload) {
    return (await this.api.put(`${url}/api/project/${project_id}`, payload)).data
  }
}

export const projectService = new ProjectService()
