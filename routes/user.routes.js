const express = require("express")
const userRouter = express.Router()

const { verifyToken } = require("../middlewares/jwtAuth.middleware")
const { authorize } = require("../middlewares/roleAuthorize.middleware")

const {
    userLogin,
    userLogout,
    getNewToken,
    userSignUp,
    userDelete,
    viewProfile,
    signupAdmin
} = require('../controllers/user.controller')


userRouter.post('/signup', userSignUp)

userRouter.post("/login", userLogin)

userRouter.get("/logout", verifyToken, userLogout)

userRouter.get("/getnewtoken", getNewToken)

userRouter.get("/profile", verifyToken, viewProfile)

userRouter.post("/adminsignup", verifyToken,authorize(["Admin"]), signupAdmin)

userRouter.delete("/deleteuser", verifyToken,authorize(["Admin"]), userDelete)


module.exports = { userRouter }
