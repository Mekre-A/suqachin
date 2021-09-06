const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')

const customerRouter = require('./routes/customers')
const adminRouter = require('./routes/admin')
const sellerRouter = require('./routes/seller')

const hbs = require('hbs');
const path = require('path')
const viewsPath = path.join(__dirname, './templates/views')

require('./db')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')

const app = express();
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(customerRouter)
app.use(adminRouter)
app.use(sellerRouter)
app.get('*', function(req, res){
  res.status(404).send()
});

module.exports = app;