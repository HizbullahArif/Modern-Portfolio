const express = require('express');
const app = express();

const User = require('./models/User')
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
app.use(express.json())
// Database connection
require('./db/conn')
app.use(require('./router/auth'))

// middle ware
const middleware = (req, res, next) => {
    console.log("I am a middle ware");
    next()
}
app.get('/',(req, res)=>{
    res.send("<h1>Homepage</h1>")
})

app.get('/about',middleware,(req, res)=>{
    res.send("<h1> about </h1>")
})

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})