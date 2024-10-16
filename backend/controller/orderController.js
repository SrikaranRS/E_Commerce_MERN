const Order=require('../models/orderModel')
const Product=require('../models/productModel')
const catchAsync=require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

exports.newOrder=catchAsync(async(req,res,next)=>{

    const{
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body

    const order=await Order.create( {orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id})

        res.status(200).json({
            success:true,
            order
        })



})

//get single order

exports.getSingleOrder=catchAsync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    if(!order){
        return next(new ErrorHandler('Order not found', 404))
    }
    res.status(200).json({
        success:true,
        order
    })

})


//getOrders for user

exports.getOrder=catchAsync(async(req,res,next)=>{
    const order=await Order.find({user:req.user.id})

    if(!order){
        return next(new ErrorHandler('Order not found', 404))
    }
    res.status(200).json({
        success:true,
        order
    })

})

//getAllOrders and amount -Admin
exports.getAdminOrder = catchAsync(async (req, res, next) => {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
        return next(new ErrorHandler('Order not found', 404));
    }


    let totalAmount=0;
    orders.forEach((order)=>{
        
      totalAmount=totalAmount+  order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//updateStatus

exports.updateOrder=catchAsync(async(req,res,next)=>{
    const orders=await Order.findById(req.params.id);
    if(orders.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    orders.orderItems.forEach(async orderItem => {
        await productStock(orderItem.product, orderItem.quantity)
    })

    orders.orderStatus=req.body.orderStatus;
    orders.deliveredAt = Date.now();
    await orders.save();

    res.status(200).json({
           success:true,
           orders
    })




})

async function productStock(productId,quantity){

    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})


}

exports.deleteOrder = catchAsync(async (req, res, next) => { 
    const order = await Order.findByIdAndDelete(req.params.id);
  
    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }
    
    res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
        order
    });
});
