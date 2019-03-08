
const express = require('express');
var app = express();
const port = process.env.PORT ||3000;

const Router = require('./router');
const  mongooseConfig = require('./db/mongooseConfig');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(Router);


app.listen(port,()=>{
    console.log(`Server Started on port ${port}`)
})