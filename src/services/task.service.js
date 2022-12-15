import axios from 'axios'

const url = 'http://localhost:3100'

class TaskService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async all(project_id) {
    return (await this.api.get(`${url}/api/tasks/${project_id}`)).data
  }

  async detail(task_id) {
    return (await this.api.get(`${url}/api/task/${task_id}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/task`, payload)).data
  }

  async update(task_id, payload) {
    return (await this.api.put(`${url}/api/task/${task_id}`, payload)).data
  }
}

export const taskService = new TaskService()
