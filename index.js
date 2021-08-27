const express = require('express');

const customerRouter = require('./routes/customers')
const adminRouter = require('./routes/admin')
const sellerRouter = require('./routes/seller')


require('./db')

const app = express();
const port = process.env.PORT

app.use(express.json())

app.use(customerRouter)
app.use(adminRouter)
app.use(sellerRouter)


app.listen(port, ()=>{
    console.log('Server started on port ' + port)
})