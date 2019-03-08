
const express = require('express');
var app = express();
const port = process.env.PORT ||3000;

const Router = require('./router');

app.use(Router);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port,()=>{
    console.log(`Server Started on port ${port}`)
})