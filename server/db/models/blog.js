const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    _creator:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Number,
    },
    blogText:{
        type:String,
        trim:true
    },
    postTittle:{
        type:String,
        trim:true
    }

});


var Blog = new mongoose.model('blog',blogSchema);

module.exports = Blog;