const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')

const customerRouter = require('./routes/customers')
const adminRouter = require('./routes/admin')
const sellerRouter = require('./routes/seller')


require('./db')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')

const app = express();
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(customerRouter)
app.use(adminRouter)
app.use(sellerRouter)

module.exports = app;