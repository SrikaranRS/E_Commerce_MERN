const express=require('express')
const app=express();
require('dotenv').config()
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
const cors=require('cors')

app.use(cors())

const errorMiddleware = require('./middlewares/error');
const connectDatabase=require('./config/database')
const productRoute=require('./routes/productRoutes')
const authRoute=require('./routes/authRoutes')
const orderRoute=require('./routes/orderRoutes')

connectDatabase()
app.use('/api/v1',productRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/order',orderRoute)
app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
     console.log('5010 connected')
}) 

process.on('unhandledRejection',(err)=>{
     console.log(`Error:${err.message}`);
     console.log('Shutting down the server due to unhandled rejection error');
     process.exit(1)
})

process.on('uncaughtException',(err)=>{
     console.log(`Error: ${err.message}`);
     console.log('Shutting down the server due to uncaught exception error');
         process.exit(1);
 })
