import axios from 'axios'

const url = 'http://localhost:3100'

class AccountService {
  constructor() {
    this.baseUrl = `${url}/api/account/login`
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async login(payload) {
    return (await this.api.post(this.baseUrl, payload)).data
  }

  async all() {
    return (await this.api.get(`${url}/api/users/information`)).data
  }
}

export const accountService = new AccountService()
