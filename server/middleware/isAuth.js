// Middleware function that check if the user is authenticated abd if there exist a session
var isAuth = function(req,res,next){
    if(!req.session.user){
       
        return res.clearCookie("connect.sid").sendStatus(401);
    }
    next();
}


module.exports = isAuth;