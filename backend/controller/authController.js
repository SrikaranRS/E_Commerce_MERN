const userModal=require('../models/userModal')
const catchAsync=require('../middlewares/catchAsyncError');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const ErrorHandler=require('../utils/errorHandler');
const sendEmail = require('../utils/email');
const crypto=require('crypto');
const { use } = require('../routes/authRoutes');
const sendToken = require('../utils/jwt');
const { json } = require('body-parser');

exports.getUser=async(req,res)=>{

    const user=await userModal.find({});
    res.status(201).json({
        success: true,
        message: "Successfuly got Users List",
       user
    });
    
}
exports.registerUser = catchAsync(async (req, res, next) => {
    const {name, email, password,avatar } = req.body

   // let avatar;
    
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }

    const emailExist=await userModal.findOne({email})

    if(emailExist){
        return next(new ErrorHandler('Email already exist', 401))
    }

    const user = await userModal.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res)

})


exports.loginUser = catchAsync(async (req, res, next) => {
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await userModal.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})


exports.logoutUser = (req, res, next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })

}
//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsync( async (req, res, next)=>{
    const user =  await userModal.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})
    
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "JVLcart Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

//Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsync( async (req, res, next) => {
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
 
     const user = await userModal.findOne( {
         resetPasswordToken,
         resetPasswordTokenExpire: {
             $gt : Date.now()
         }
     } )
 
     if(!user) {
         return next(new ErrorHandler('Password reset token is invalid or expired'));
     }
 
     if( req.body.password !== req.body.confirmPassword) {
         return next(new ErrorHandler('Password does not match'));
     }
 
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordTokenExpire = undefined;
     await user.save({validateBeforeSave: false})
     sendToken(user, 201, res)
 
 })

 //getProfile
 exports.getProfile=catchAsync(async(req,res,next)=>{

    const user=await userModal.findById(req.user.id);
   
    sendToken(user, 201, res)
 })
 exports.changePassword=catchAsync(async(req,res,next)=>{
    
    const user=await userModal.findById(req.user.id).select('+password');
    if(!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }
    user.password=req.body.password
    await user.save();
    res.status(200).json({
        success:true,
        message:"password changed successfully",
        user
    }
    )


 })
 
 exports.updateProfile=catchAsync(async(req,res,next)=>{

    const {email,name,avatar}=req.body;
    
    const user= await userModal.findByIdAndUpdate(req.user.id,{email,name,avatar},{new:true,runValidators:true})

    res.status(200).json({
        success:true,
        user
    })


 })

 exports.getSingleUSer=catchAsync(async(req,res,next)=>{

    const user=await userModal.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    }
    )
 })

 exports.updateProfileAdmin=catchAsync(async(req,res,next)=>{

    const {email,name,role}=req.body;
    const id=req.params.id
    
    const user= await userModal.findByIdAndUpdate(id,{email,name,role},{new:true,runValidators:true})

    res.status(200).json({
        success:true,
        user
    })


 })


 exports.deleteProfileAdmin=catchAsync(async(req,res,next)=>{
    const id=req.params.id
    const user= await userModal.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:"Deleted Successfully"
        
    })
 })