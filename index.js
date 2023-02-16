import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import session from "express-session"
import UserRoutes from "./routes/UserRoutes.js"
import bodyParser from "body-parser"
import carouseisRoute from "./routes/carouseisRoute.js"
import Profile from "./routes/ProfileRoute.js"
import dataRoute from "./routes/data.js"
import storeRoute from "./routes/storeRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import shoppingCartRoute from "./routes/shoppingCartRoute.js"
import regionRoute from "./routes/regionRoute.js"
import shippingAddressRoute from "./routes/shippingAddressRoute.js"
import courierRoute from "./routes/courierRoute.js"
import checkoutRoute from "./routes/checkoutRoute.js"
import callbackPaymentRoute from "./routes/callbackPaymentRoute.js"
import db from"./config/database.js"
import fileUpload from"express-fileupload"
// import compression from "compression"

// const  = require('express-fileupload');

dotenv.config();

const port = process.env.PORT || 8300

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());

app.use(cors())
// app.use(compression())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// app.use(session({
//   secret: process.env.JWT_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     secure: 'auto'
//   }
// }));

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(cookieParser())

// (async()=>{
//   await db.sync();
// })();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(UserRoutes)
app.use(Profile)
app.use(carouseisRoute)
app.use(dataRoute)
app.use(storeRoute)
app.use(categoryRoute)
app.use(productRoute)
app.use(shoppingCartRoute)
app.use(regionRoute)
app.use(shippingAddressRoute)
app.use(courierRoute)
app.use(checkoutRoute)
app.use(callbackPaymentRoute)


app.listen(port, () => console.log(`Server running at port ${port}`))
