const express = require('express')
let products = require('../products')
const routes = express.Router()

routes.get('/', (_req, res) => res.send(products))

routes.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }

    return res.send(product)
})

routes.post('/', (req, res) => {
    const newProduct = req.body
    products = [...products, newProduct]
    return res.status(201).send(newProduct)
})

routes.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const newProperty = req.body
    const productIndex = products.findIndex(product => product.id === id)

    if (productIndex === -1) {
        return res.status(404).send({ message: 'Product not found' })
    }

    products[productIndex] = { ...products[productIndex], ...newProperty }

    return res.send(products[productIndex])
})

routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }

    products = products.filter(product => product.id !== id)

    return res.status(204).send()
})

module.exports = routes