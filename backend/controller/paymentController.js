const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY)
// Load environment variables
console.log(process.env.STRIPE_API_KEY);
exports.processPayment  = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
   
    const stripeApiKey ='pk_test_51QPKLfP95qc3mhrCaqacqpHByqqbPNpN96ECtxZtvikrPjQKZr9FnuHLcbBfanhMbOa0IeLoA81E3HRVBhIqgWVh00b4h9Os73' 

   
    res.status(200).json({

        success: true,
        stripeApiKey: stripeApiKey, 
    });
});
