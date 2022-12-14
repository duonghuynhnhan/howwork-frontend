const knex = require('../database/knex')

class TaskAssignedService {
    constructor() {
        this.taskassigneds = knex('taskassigned')
    }

    #getTaskAssigned(payload) {
        const taskAssigned = { ...payload }
        const taskAssignedProperties = [
            'id',
            'task',
            'user',
        ]

        Object.keys(taskAssigned).forEach(function (key) {
            if (taskAssignedProperties.indexOf(key) == -1) {
                delete taskAssigned[key]
            }
        })

        return taskAssigned
    }

    async all(username) {
        return await this.taskassigneds.where('user', username).select('task')
    }

    // async create(payload) {
    //     const job = this.#getProjectAssigned(payload)
    //     const [id] = await this.jobs.insert(job)
    //     return { id, ...job }
    // }

    // async findById(id) {
    //     return await this.jobs.where('id', id).select('*').first()
    // }
}

module.exports = TaskAssignedService
