import axios from 'axios'

const url = 'http://localhost:3100'

class ProjectCommentService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async all(project_id) {
    return (await this.api.get(`${url}/api/project/comments/${project_id}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/project/comment`, payload)).data
  }

  async delete(comment_id) {
    return (await this.api.delete(`${url}/api/project/comment/${comment_id}`)).data
  }

  //   async detail(project_id) {
  //     return (await this.api.get(`${url}/api/project/${project_id}`)).data
  //   }

  //   async getMany() {
  //     return (await this.api.get(this.baseUrl)).data
  //   }

  //   async create(payload) {
  //     return (await this.api.post(`${url}/api/project`, payload)).data
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

export const projectCommentService = new ProjectCommentService()
