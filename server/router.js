const Router = require('express').Router();
const User = require('./db/models/user');
const _ = require('lodash');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

Router.use(expressSession({resave:false,saveUninitialized:true,secret:"nkdbcjkdcmcknklendjndbdjjdknjdnjncdjcbdjbhsfcxdxsfdbmkgmbngjkbngjdbcjdbc"}));


// Signup route 
Router.post('/sign-up',(req,res,next)=>{
    var body = req.body;
    var newUser = new User(body)   
    newUser.signUp().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err)
    });
});


    // Login Route 
Router.get('/login',(req,res,next)=>{
    var body = req.body;
    User.Auth(body.email,body.password).then(user=>{
        req.session.user = user;
        res.send(user);
    },err=>{
        res.status(401).send(err);
    })


// Example of a private route 
    Router.get('/data',(req,res,next)=>{
        if(!req.session.user){
            return res.sendStatus(401);
        }
        console.log(req.sessionID);
        return res.send("Welcome "+ req.session.user.username);
    })

});

module.exports = Router;