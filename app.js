const express = require('express')
const apiRouter = require('./routes/api')

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.use((_req, res, _next) => res.send({ message: 'Route not found' }))

app.listen(3000, () => console.log('Server is running...'))