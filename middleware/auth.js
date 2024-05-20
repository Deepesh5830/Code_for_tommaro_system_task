const JWT = require("jsonwebtoken");
const db = require("../models")
const User = db.User;

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied' })
        }
        const userVerify = await JWT.verify(token, process.env.SEC_KEY)
        if (userVerify) {
            const user = await User.findOne({ where: { id: userVerify } })
            req.user = user;
            next()
        } else {
            return res.status(401).json({ success: false, message: 'Access denied' })
        }
    } catch (error) {
        console.log("error--->", error)
    }
}

module.exports = authenticateUser;