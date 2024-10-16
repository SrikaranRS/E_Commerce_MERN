const { error } = require("console");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    stack: err.stack,
    /* 
      error: err.errors ? Object.values(err.errors) : undefined, */ // Adjusted for safety
    });
  }

  if (process.env.NODE_ENV === "production") {
    let message = err.message;
    let errorResponse = { ...err }; // Renamed to avoid confusion with the error object

    if (err.name === "ValidationError") { // Fixed assignment to comparison
      message = Object.values(err.errors).map(value => value.message).join(", "); // Join messages into a string
      errorResponse = new Error(message); // Create a new error object with the message
      errorResponse.statusCode = 400; // Set status code for validation error
    }

    res.status(errorResponse.statusCode || 500).json({
      success: false,
      message: message || "Internal Server Error",
    });
  }
};
