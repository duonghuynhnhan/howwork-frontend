const knex = require('../database/knex')

class PersonService {
    constructor() {
        this.persons = knex('persons')
    }

    #getPerson(payload) {
        const person = { ...payload }
        const personProperties = [
            'id',
            'fullname',
            'dob',
            'sex',
            'email',
            'phone',
            'position',
            'unit',
        ]

        Object.keys(person).forEach(function (key) {
            if (personProperties.indexOf(key) == -1) {
                delete person[key]
            }
        })

        return person
    }

    async create(payload) {
        const person = this.#getPerson(payload)
        await this.persons.insert(person)
        return { ...person }
    }

    async findByUsername(username) {
        return await this.persons
                        .join('accounts', 'persons.id', 'accounts.person')
                        .where('accounts.username', username)
                        .select('id', 'fullname', 'dob', 'sex', 'email', 'phone', 'position', 'unit')
                        .first()
    }

    async findById(id) {
        return await this.persons.where('id', id).select('*').first()
    }

    async update(username, payload) {
        const update = this.#getPerson(payload)
        return await this.persons
                        .join('accounts', 'persons.id', 'accounts.person')
                        .where('accounts.username', username)
                        .update(update)
    }
}

module.exports = PersonService
