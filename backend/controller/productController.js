const productModel = require('../models/productModel');
const mongoose = require('mongoose');
const CatchAsyncError=require('../middlewares/catchAsyncError.js')
const ErrorHandler = require('../utils/errorHandler.js');
const APIFeature=require('../utils/apiFeatures.js')

// Get all products
exports.getProduct = async (req, res, next) => {
    const resPerPage = 6;
    
    let buildQuery = () => {
        return new APIFeature(productModel.find(), req.query).search().filter()
    }
    
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await productModel.countDocuments({});
    let productsCount = totalProductsCount;

    if(filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }
    
    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success : true,
        count: productsCount,
        resPerPage,
        products
    })
};
exports.getSingleProduct = async (req, res, next) => {
    const {id}=req.params
     if (!mongoose.isValidObjectId(id)) {
        return next(new ErrorHandler('Invalid Product IDs', 400));
    }
    const product = await productModel.findById(id);
    if(!product) {
    return next(new ErrorHandler('Product not found', 400));
    }
    res.status(201).json({
    success: true,
    product
    })
};


// Create a new product
exports.newProduct = CatchAsyncError(async (req, res, next) => {
    // Ensure req.user is set by isAuthenticatedUser middleware
    if (!req.user) {
        return next(new ErrorHandler('User not authenticated', 401));
    }

    // Create product with user information
    const productData = {
        ...req.body,
        user: req.user.id,  // Set the user here
    };

    const product = await productModel.create(productData);

    res.status(201).json({
        success: true,
        message: "New Product added",
        product,
    });
});

// Update an existing product
exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            product
        });
    } catch (error) {
        next(new ErrorHandler('Failed to update product', 400)); // Pass specific error
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findByIdAndDelete(id);
        
        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            product
        });
    } catch (error) {
        next(new ErrorHandler('Failed to delete product', 400)); // Pass specific error
    }
};

//Create Review - api/v1/review
exports.createReview = CatchAsyncError(async (req, res, next) =>{
    const  { productId, rating, comment } = req.body;

    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await productModel.findById(productId);
   //finding user review exists
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating the  review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }

        })

    }else{
        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })


})


//getReview

exports.getReview=CatchAsyncError(async(req,res,next)=>{
    const product=await productModel.findById(req.params.id)

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })

})


//deleteReview

//Delete Review - api/v1/review
exports.deleteReview = CatchAsyncError(async (req, res, next) =>{
    const product = await productModel.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews 
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});