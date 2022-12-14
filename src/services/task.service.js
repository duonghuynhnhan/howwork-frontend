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

  //   async getMany() {
  //     return (await this.api.get(this.baseUrl)).data
  //   }

  //   async deleteMany() {
  //     return (await this.api.delete(this.baseUrl)).data
  //   }

  //   async get(id) {
  //     return (await this.api.get(`${this.baseUrl}/${id}`)).data
  //   }

  //   async update(id, admin) {
  //     return (await this.api.put(`${this.baseUrl}/${id}`, admin)).data
  //   }

  //   async delete(id) {
  //     return (await this.api.delete(`${this.baseUrl}/${id}`)).data
  //   }
}

export const taskService = new TaskService()
