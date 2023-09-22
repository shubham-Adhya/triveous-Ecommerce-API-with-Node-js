const jwt = require('jsonwebtoken');
require("dotenv").config()

const { UserModel } = require("../model/user.model")
const { BLModel } = require("../model/blacklist.model")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const blToken = await BLModel.findOne({ BL_Token: token });
        if (blToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const { userId } = decodedToken;
        
        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        // console.log(error)
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

module.exports = { verifyToken }