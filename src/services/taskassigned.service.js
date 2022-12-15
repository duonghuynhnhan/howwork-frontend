import axios from 'axios'

const url = 'http://localhost:3100'

class TaskAssignedService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async all(username) {
    return (await this.api.get(`${url}/api/user/tasks/${username}`)).data
  }

  async detail(username) {
    return (await this.api.get(`${url}/api/project/${username}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/task/assigned`, payload)).data
  }
}

export const taskAssignedService = new TaskAssignedService()
