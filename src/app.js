// import libraries
const express = require('express')
const app = express()
let bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const conn = require('../db/mongoose')


const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello in platform')
})


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


// auth
const authRouter = require('../routes/authRoutes')
app.use(authRouter)

//User
// const UserRouter = require('../routes/userRoutes')
// app.use(UserRouter)

// service
const ServiceRouter = require('../routes/serviceRoutes')
app.use(ServiceRouter)

//conversation
const conversationRouter = require('../routes/conversationRoutes')
app.use(conversationRouter)

//detailes
const CategoryRouter = require('../routes/CategoryRoutes')
app.use(CategoryRouter)

//review
const ProductRouter = require('../routes/ProductRoutes')
app.use(ProductRouter)

//profile
const profileRouter = require('../routes/profileRoutes')
app.use(profileRouter)

// //upload
// const uploadRouter = require('../routes/uploadRoutes')
// app.use(uploadRouter)


//messageRouter
const messageRouter = require('../routes/messageRoutes')
app.use(messageRouter)

const subCategory = require('../routes/SubcategoryRoutes')
app.use(subCategory)


conn().then(() => {
    app.listen(port, () => console.log(`Localhost is ${port}`))
})