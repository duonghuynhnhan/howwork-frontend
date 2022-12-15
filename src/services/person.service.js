import axios from 'axios'

const url = 'http://localhost:3100'

class PersonService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async information(username) {
    return (await this.api.get(`${url}/api/admin/information/${username}`)).data
  }

  async create(payload) {
    return (await this.api.post(`${url}/api/user`, payload)).data
  }
}

export const personService = new PersonService()
