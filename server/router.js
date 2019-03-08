const Router = require('express').Router();
const User = require('./db/models/user');
const _ = require('lodash');
Router.post('/sign-up',(req,res,next)=>{
    var body = req.body;


    var newUser = new User(body)
   
    newUser.signUp().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err)
    });;

});

module.exports = Router;