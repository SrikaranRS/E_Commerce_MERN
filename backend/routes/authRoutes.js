const express=require('express');
const { registerUser, getUser, loginUser, logoutUser, forgotPassword, resetPassword, getProfile, changePassword, updateProfile, getSingleUSer, updateUserAdmin, updateProfileAdmin, deleteProfileAdmin } = require('../controller/authController');
const { isAuthenticatedUser, isAutherizedRoles } = require('../middlewares/authMiddleware');
const routes=express.Router()

routes.route('/').get(getUser)
routes.route('/register').post(registerUser)
routes.route('/login').post(loginUser)
routes.route('/logout').post(logoutUser)
routes.post('/forgotpassword', forgotPassword);
routes.post('/resetpassword/:token', resetPassword);
routes.route('/getProfile').get(isAuthenticatedUser,getProfile)
routes.route('/changePassword').post(isAuthenticatedUser,changePassword)
routes.route('/updateProfile').put(isAuthenticatedUser,updateProfile)

//admin
routes.route('/getSingleProfile').get(isAuthenticatedUser,isAutherizedRoles('admin'),getSingleUSer)
routes.route('/UpdateUserAdmin/:id').put(isAuthenticatedUser,isAutherizedRoles('admin'),updateProfileAdmin)
routes.route('/DeleteUserAdmin/:id').delete(isAuthenticatedUser,isAutherizedRoles('admin'),deleteProfileAdmin)

module.exports=routes;