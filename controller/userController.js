const bcryptJS = require("bcrypt")
const JWT = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const db = require("../models")
const User = db.User;

const userRegister = async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body;
        if (!userName || !userEmail || !password) {
            return res.status(404).json({ success: false, message: "required fields." })
        }
        const isExist = await User.findOne({ where: { userEmail: userEmail } })
        if (isExist) {
            return res.status(401).json({ success: false, message: "userEmail already isExist." })
        }
        const hash_password = await bcryptJS.hash(password, 10)
        const info = { userName, userEmail, password: hash_password }
        const user = await User.create(info)
        res.status(201).json({ success: true, message: "User created successful.", user })

    } catch (error) {
        console.log("error-->", error)
    }
}

const userLogin = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        if (!userEmail || !password) {
            return res.status(404).json({ success: false, message: "required fields." })
        }
        const user = await User.findOne({ where: { userEmail: userEmail } })
        if (user) {
            const isLogin = await bcryptJS.compare(password, user.password)
            if (isLogin) {
                const token = await JWT.sign(user.id, process.env.SEC_KEY);
                res.status(200).json({ success: true, message: "Login successful.", token })
            }
        } else {
            return res.status(404).json({ success: false, message: "Invalid Crediential" })
        }

    } catch (error) {
        console.log("error-->", error)
    }
}

module.exports = { userRegister, userLogin }