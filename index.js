const express = require('express');

const customerRouter = require('./routes/customers')


require('./db')

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(customerRouter)


app.listen(port, ()=>{
    console.log('Server started on port ' + port)
})