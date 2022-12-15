import axios from 'axios'

const url = 'http://localhost:3100'

class AccountService {
  constructor() {
    this.baseUrl = this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  async login(payload) {
    return (await this.api.post(`${url}/api/account/login`, payload)).data
  }

  async forgotPassword(payload) {
    return (await this.api.post(`${url}/api/account/forgot-password`, payload)).data
  }

  async changePassword(username, payload) {
    return (await this.api.put(`${url}/api/user/password/${username}`, payload)).data
  }

  async changeKey(username, payload) {
    return (await this.api.put(`${url}/api/user/key/${username}`, payload)).data
  }

  async all() {
    return (await this.api.get(`${url}/api/users/information`)).data
  }
}

export const accountService = new AccountService()
