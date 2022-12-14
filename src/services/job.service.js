const knex = require('../database/knex')

class JobService {
    constructor() {
        this.jobs = knex('jobs')
    }

    #getJob(payload) {
        const job = { ...payload }
        const jobProperties = [
            'id',
            'name'
        ]

        Object.keys(job).forEach(function (key) {
            if (jobProperties.indexOf(key) == -1) {
                delete job[key]
            }
        })

        return job
    }

    async all() {
        return await this.jobs.select('*')
    }

    async create(payload) {
        const job = this.#getJob(payload)
        const [id] = await this.jobs.insert(job)
        return { id, ...job }
    }

    async findById(id) {
        return await this.jobs.where('id', id).select('*').first()
    }

    async update(id, payload) {
        const update = this.#getJob(payload)
        return await this.jobs.where('id', id).update(update)
    }

    async delete(id) {
        return await this.jobs.where('id', id).del()
    }
}

module.exports = JobService
