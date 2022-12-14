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

  //   async all() {
  //     return (await this.api.get(`${url}/api/projects`)).data
  //   }

  async detail(username) {
    return (await this.api.get(`${url}/api/project/${username}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/task/assigned`, payload)).data
  }

  //   async getMany() {
  //     return (await this.api.get(this.baseUrl)).data
  //   }

  //   async create(payload) {
  //     return (await this.api.post(`${url}/api/project/assigned`, payload)).data
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

export const taskAssignedService = new TaskAssignedService()
