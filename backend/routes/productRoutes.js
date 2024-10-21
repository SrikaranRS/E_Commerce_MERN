const express=require('express');
const { getProduct, newProduct, updateProduct, deleteProduct, getOneProduct, getSingleProduct, createReview, getReview, deleteReview } = require('../controller/productController');
const { isAuthenticatedUser, isAutherizedRoles } = require('../middlewares/authMiddleware');
const routes=express.Router();


routes.route('/product').get(getProduct)
routes.route('/product/:id').get(getSingleProduct)
routes.route('/product/add').post(isAuthenticatedUser,newProduct)
routes.route('/product/review').put(isAuthenticatedUser,createReview)

routes.route('/product/getReview/:id').get(isAuthenticatedUser,getReview)
routes.route('/product/deleteReview').delete(deleteReview)

routes.route('/product/update/:id').put(updateProduct)
routes.route('/product/delete/:id').delete(deleteProduct)

module.exports=routes;