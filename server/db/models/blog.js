const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
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

blogSchema.statics.findPosts = function(id){
   return Blog.find({_creator:ObjectID(id)}).then((posts)=>{
        return Promise.resolve(posts);
    }).catch(err=>{
        return Promise.reject(err);
    });
}
blogSchema.statics.deletePost = function(id,userId){

    return Blog.findOneAndDelete({_id:ObjectID(id),_creator:ObjectID(userId)}).then(deletedPost=>{
        return Promise.resolve(deletedPost);
    }).catch(err=>{
        
        return Promise.reject(err)
    })

}

var Blog = new mongoose.model('blog',blogSchema);

module.exports = Blog;