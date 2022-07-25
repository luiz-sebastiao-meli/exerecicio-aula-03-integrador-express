const express = require('express')
let users = require('../users')
const routes = express.Router()

function generateId() {
    const lastUser = users[users.length - 1]
    return lastUser ? lastUser.id + 1 : 1
}

function validateUser(req, res, next) {
    const { username, email, password } = req.body

    if (username && email && password) {
        return next()
    }

    return res.status(400).send({ message: 'User must have an username, email and password' })
}

routes.get('/', (_req, res) => res.send(users))

routes.post('/', validateUser, (req, res) => {
    const newUser = { id: generateId(), ...req.body }
    users = [...users, newUser]
    return res.status(201).send(newUser)
})

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedUser = req.body
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).send({ message: 'User not found' })
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser }

    return res.send(users[userIndex])
})

routes.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { password: newPassword } = req.body
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).send({ message: 'User not found' })
    }

    if (newPassword) {
        users[userIndex] = { ...users[userIndex], password: newPassword }
    }

    return res.send(users[userIndex])
})

routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const user = users.find(user => user.id === id)

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    users = users.filter(user => user.id !== id)

    return res.status(204).send()
})

module.exports = routes