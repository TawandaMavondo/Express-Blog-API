const mongoose = require('mongoose');
// const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        uppercase:false
    },
    surname:{
        type:String,
        uppercase:false
    },
    username:{
        type:String,
        unique:true,
        minlength:6
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minlength:6
    }

});



// UserSchema.methods.toJSON = function(){
//     var user = this;
//     var userObject = user.toObject();
//     return  _.pick(userObject,['_id','firstname','surname','username','email']);
// }

UserSchema.methods.signUp = function(){
    var user = this;
    return new Promise((resolve,reject)=>{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(user.password.toString(),salt,function(err,hash){
               
                    user.password = hash
                    user.save().then(user=>{
                        resolve(user);
                    }).catch(err=>{
                        reject(err);
                    });
                });
         });
});

}

var User =  new mongoose.model('User',UserSchema);

module.exports = User;
