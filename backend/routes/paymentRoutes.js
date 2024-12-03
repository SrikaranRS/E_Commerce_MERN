const express = require('express');
const { processPayment, sendStripeApi } = require('../controller/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/process').post( isAuthenticatedUser, processPayment);
router.route('/stripeapi').get( isAuthenticatedUser, sendStripeApi);


module.exports = router;