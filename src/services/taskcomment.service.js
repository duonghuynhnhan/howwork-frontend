import axios from 'axios'

const url = 'http://localhost:3100'

class TaskCommentService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async all(task_id) {
    return (await this.api.get(`${url}/api/task/comments/${task_id}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/task/comment`, payload)).data
  }

  async delete(comment_id) {
    return (await this.api.delete(`${url}/api/task/comment/${comment_id}`)).data
  }
}

export const taskCommentService = new TaskCommentService()
