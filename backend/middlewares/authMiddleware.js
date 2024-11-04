const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModal')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
    let token = req.cookies.token || req.headers['x-auth-token'];
   
  if( !token ){
        return next(new ErrorHandler('Login first to handle this resource', 401))
   } 

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})
 
/* exports.isAuthenticatedUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = await User.findById(decoded.id);
        next();
    });
}; */
exports.isAutherizedRoles= (...roles)=>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }

}