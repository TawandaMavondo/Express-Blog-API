
const express = require('express')
const User = require('./db/models/user');
const _ = require('lodash');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const Blog = require('./db/models/blog');
const Router = express.Router();

Router.use(express.urlencoded({extended:true}));
Router.use(express.json());
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
      

    Router.post('/new/post',(req,res,next)=>{
        if(!req.session.user){
            return res.sendStatus(401);
        }

            var newBlogPost = new Blog({
                _creator:req.session.user._id,
                createdAt:Date.now(),
                blogText:req.body.blogText,
                postTittle:req.body.postTittle
            }
        );
        newBlogPost.save().then(post=>{
            res.send(post);
        }).catch(err=>{
            res.status(400).send(err);
        })
       
    })

});

module.exports = Router;