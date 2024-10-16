const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
    /* try {
        await mongoose.connect(process.env.MONGOOSE_CONNECT);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    } */
        await mongoose.connect(process.env.MONGOOSE_CONNECT)
        .then(()=>{
            console.log("Database connected successfully");
        })
        
};

module.exports = connectDatabase;
