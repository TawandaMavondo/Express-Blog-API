const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BlogAPI',{useNewUrlParser:true,useCreateIndex:true}).then(()=>{
    console.log("Connected to the Database");
},err=>{
    console.error(err);
})
module.exports = mongoose;