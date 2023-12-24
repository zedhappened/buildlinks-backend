import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config()

export const signIn = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password)
        throw new Error("Email & password are required")

    const user = await User.findOne({ email })

    if (!user)
        throw new Error("Email not found")

    const checkPassword = await bcrypt.compare(password, user.hashedPassword)

    if (!checkPassword)
        throw new Error("Incorrect password")

    const accessToken = generateAccessToken({ id: (user._id).toString(), email, roles: user.roles })

    res.json({ user: user._id, roles: user.roles, accessToken })

}
export const signUp = async (req, res) => {

    const { email, password} = req.body

    if (!email || !password)
        throw new Error("Email & password are required")

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({ email, hashedPassword, roles: ["user"] })

    const accessToken = generateAccessToken({ id: (user._id).toString(), email, roles: user.roles })

    res.json({ user: user._id, roles: user.roles, accessToken })

}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}