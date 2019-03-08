const Router = require('express').Router();


Router.get('/',(req,res,next)=>{
    res.send("Tawanda")
});

module.exports = Router;