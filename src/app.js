const express =require('express')
//const cors = require('cors')
const app = express()

//////// import Routers /////////////////////////////////////////////////////////////////
const typeRouter=require("./router/type")
const unitRouter=require("./router/unit")
const userRouter=require("./router/user")
const customerRouter=require("./router/customer")
const orderRouter=require("./router/order")
const productRouter=require("./router/product")
const imageRouter=require("./router/imageProduct")
const loginRouter=require("./router/login")
const uploadImage = require('./upload/upload.product')
const shopRouter = require('./router/shop')
const paymentRouter = require('./router/payment')
const commentRouter = require('./router/comment')
const aiRouter = require('./router/ai')
const AdminPaymentRouter = require('./router/AdminPayment')


require('./db/db')
// const corsOpts = {
//     origin: '*',
  
//     methods: [
//       'GET',
//       'POST',
//       'PUT',
//       'DELETE',
//       'OPTIONS'
//     ],
  
//     allowedHeaders: [
//         "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
//     ],
//   };
app.use(express.json())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://bf6a-115-84-119-28.ngrok-free.app')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type','https://bf6a-115-84-119-28.ngrok-free.app')
//     next()
//   })
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
//app.use(cors(corsOpts))
app.get('/',(req,res) => {
    res.send('No authorization')
})

// global.basedir = __dirname;


//app.use("/uploads", express.static(__dirname + "/uploads"));

////////// Use Routers //////////////////////////////////////////////////////////////////
app.use('/type',typeRouter)
app.use('/unit',unitRouter)
app.use('/user',userRouter)
app.use('/customer',customerRouter)
app.use('/order',orderRouter)
app.use('/product',productRouter)
app.use('/image',imageRouter)
app.use('/login',loginRouter)
app.use('/uploads',uploadImage)
app.use('/shop',shopRouter)
app.use('/payment',paymentRouter)
app.use('/AdminPayment',AdminPaymentRouter)
app.use('/comment',commentRouter)
app.use('/recommend',aiRouter)



module.exports=app;