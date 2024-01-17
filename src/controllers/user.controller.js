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

    res.json({ name: user.name, user: user._id, roles: user.roles, accessToken })

}
export const signUp = async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password)
        throw new Error("All fields are required")

    const user = await User.findOne({ email })

    if (user)
        throw new Error("Email already exists")

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({ name, email, hashedPassword, roles: ["user"] })

    const accessToken = generateAccessToken({ id: (newUser._id).toString(), email, roles: newUser.roles })

    res.json({ name, user: newUser._id, roles: newUser.roles, accessToken })

}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}