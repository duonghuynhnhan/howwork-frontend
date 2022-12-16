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
}

export const projectCommentService = new ProjectCommentService()
