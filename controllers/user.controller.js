const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { verifyToken } = require('../middlewares/jwtAuth.middleware')


const { UserModel } = require("../model/user.model")
const { BLModel } = require("../model/blacklist.model")

//@description   SignUp
//@route         POST /user/signup
//@access        Public
const userSignUp = async (req, res) => {
    try {
        const { name, email, password, role, addresses } = req.body;

        // Check if user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (role === "Admin") {
            return res.status(406).json({ message: 'Only an Admin can create new Admin' });
        }

        // Create a new user
        const hashed_password = bcrypt.hashSync(password, +process.env.SaltRounds);
        const user = new UserModel({ email, password: hashed_password, name, role, addresses });
        await user.save();

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong");
    }
}

//@description   SignUp Admin
//@route         POST /user/adminsignup
//@access        Admin only
const signupAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if Admin already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        if (role !== "Admin") {
            return res.status(406).json({ message: 'Specify role as Admin' });
        }

        // Create a new Admin
        const hashed_password = bcrypt.hashSync(password, +process.env.SaltRounds);
        const user = new UserModel({ email, password: hashed_password, name, role });
        await user.save();

        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong");
    }
}


//@description   Login
//@route         POST /user/login
//@access        Public-All
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        // Create a JWT refresh token
        const refreshtoken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, {
            expiresIn: '7d'
        });

        return res.status(200).json({ message: "Login successfull", token, refreshtoken });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
}

//@description   Add Address
//@route         POST /user/addresses
//@access        Public-All
const addAddress = async (req, res) => {
    try {
        const {address}=req.body;
        const {email,_id}=req.user;
        if(!address){
            return res.status(401).json({ message: 'Please Provide a new address to be added' });
        }
        await UserModel.findOneAndUpdate(
            _id,
            {$push: {addresses: address}}
        ).then(()=>{
            return res.status(200).json({ message: "Address Added successfully"});
        })
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
}

//@description   Logout
//@route         GET /user/logout
//@access        JWT required
const userLogout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const black_token = new BLModel({ BL_Token: token })
    await black_token.save()
    return res.status(200).json({ message: "Logout successfull" })
}

//@description   Get new JWT token
//@route         GET /user/getnewtoken
//@access        Public-All
const getNewToken = async (req, res) => {
    try {
        const refreshtoken = req.headers.authorization?.split(" ")[1]
        const decoded = jwt.verify(refreshtoken, process.env.REFRESH_SECRET)

        if (decoded) {
            const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            return res.status(200).json({ token })
        } else {
            res.status(501).josn({ message: "Invalid refresh token, please login again" })
        }
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }

}

//@description   Get profile details
//@route         GET /user/profile
//@access        JWT required
const viewProfile = async (req, res) => {
    const { _id, name, email, role } = req.user
    return res.status(200).json({ profile: { _id, name, email, role } })
}

//@description   Delete User
//@route         DELETE /user/deleteuser
//@access        Admin only
const userDelete = async (req, res) => {
    const { email } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: 'User not found' });
        }

        await UserModel.findOneAndDelete({ email })
        return res.status(200).send({ message: "User Deleted Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong");
    }
}



module.exports = { userLogin, userLogout, getNewToken, userSignUp, userDelete, viewProfile, signupAdmin, addAddress }