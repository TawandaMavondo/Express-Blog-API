
const express = require('express')
const User = require('./db/models/user');
const _ = require('lodash');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const Blog = require('./db/models/blog');
const Router = express.Router();
const isAuth = require('./middleware/isAuth');
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


// Creating a blog post NB User must belogged in
    Router.post('/new/post',isAuth,(req,res,next)=>{
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
    // Get an array of all blog post of a certain user /logged in user NB user must be logged in 
    Router.get("/blog-posts",isAuth,(req,res,next)=>{
        Blog.findPosts(req.session.user._id).then((post)=>{
            res.send({post});
        }).catch(err=>{
            res.status(400).send(err);
        })
    });

    // Delete post from the post of the user who logged in 
    Router.delete('/delete-post/:id',isAuth,(req,res,next)=>{
        var id = req.params.id;
        
        Blog.deletePost(id,req.session.user._id).then((deleted)=>{
            deleted.isDeleted = true;
            res.send(deleted)
        }).catch(err=>{
            res.status(400).send(err);
        })

    });

});

module.exports = Router;