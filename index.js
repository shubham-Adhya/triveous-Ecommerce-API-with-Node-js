const express = require("express")
const cors = require('cors')

const { connection } = require("./configs/db")

const {swaggerServe,swaggerUI}=require("./util/swagger-config")

const { userRouter } = require("./routes/user.routes")
const { categoryRouter } = require("./routes/category.routes")
const { productRouter } = require("./routes/product.routes")
const { cartRouter } = require("./routes/cart.routes")
const { orderRouter } = require("./routes/order.routes")

const { notFound } = require('./middlewares/error.middleware')

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Ecommerce APP, for docs visit /api-docs")
})

app.use("/api-docs", swaggerServe, swaggerUI)

app.use("/user", userRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/cart", cartRouter)
app.use("/orders", orderRouter)

app.use(notFound)

app.listen(process.env.port, async () => {
    try {
        await connection.then(() => console.log("Connected to DB"))
    } catch (err) {
        console.log(err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})