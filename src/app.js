const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const timeRoute = require('./routes/timeRoute')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/', timeRoute)

module.exports = app
