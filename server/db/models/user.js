const mongoose = require('mongoose');
// const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        uppercase:false,
        trim:true
    },
    surname:{
        type:String,
        uppercase:false,
        trim:true
    },
    username:{
        type:String,
        unique:true,
        minlength:6,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        minlength:6,
        trim:true
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

UserSchema.statics.Auth= function(email,password){

    if((email===undefined || null) && (password === undefined || null)){
        return Promise.reject({errmsg:"Please provide username and password"});
    }
return new Promise((resolve,reject)=>{
    return User.findOne({email}).then(user=>{
bcrypt.compare(password,user.password).then(res=>{
    if (res){
        resolve(user)
    }else{
        reject({errmsg:"The Password is incorrect please retry"});
    }
}).catch(err=>{
    console.log(err);
})
        
    },(err)=>{
        reject(err);
    });
})

    
}



var User =  new mongoose.model('User',UserSchema);

module.exports = User;
