const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const port = process.env.port
const {
    member,
    service,
    operator,
    transaction,
    employee,
    item,
    groups
            } =require('./src/router')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// const appRoute = require('./src/router')
app.use('/api/member',member);
app.use('/api/service',service);
app.use('/api/operator',operator);
app.use('/api/transaction',transaction);
app.use('/api/employee',employee);
app.use('/api/item',item);
app.use('/api/groups',groups);


app.listen(port, ()=>{
    console.log(`Server Running Endpoint: http://localhost:${port}`);
})