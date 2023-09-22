const express=require("express")
const cors = require('cors')

const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.routes")
const { categoryRouter } = require("./routes/category.routes")
const { notFound } = require('./middlewares/error.middleware')

require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.status(200).send("Welcome to Ecommerce APP")
})

app.use("/user",userRouter)
app.use("/categories",categoryRouter)

app.use(notFound)

app.listen(process.env.port, async()=>{
    try {
        await connection.then(() => console.log("Connected to DB"))
    } catch (err) {
        console.log(err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})