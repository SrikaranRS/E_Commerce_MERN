const express=require('express');
const { isAuthenticatedUser, isAutherizedRoles } = require('../middlewares/authMiddleware');
const { newOrder, getOrder, getSingleOrder, getAdminOrder, updateOrder, deleteOrder } = require('../controller/orderController');
const { createReview } = require('../controller/productController');

const routes=express.Router();

routes.route('/newOrder').post(isAuthenticatedUser,newOrder);
routes.route('/getOrder').get(isAuthenticatedUser,getOrder);
routes.route('/getSingleOrder/:id').get(isAuthenticatedUser,getSingleOrder);
//admin

routes.route('/getAllOrders').get(isAuthenticatedUser,isAutherizedRoles('admin'),getAdminOrder);
routes.route('/updateStatus/:id').put(isAuthenticatedUser,isAutherizedRoles('admin'),updateOrder);
routes.route('/deleteOrder/:id').delete(isAuthenticatedUser,isAutherizedRoles('admin'),deleteOrder)
module.exports=routes