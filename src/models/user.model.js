import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    hashedPassword: {
        required: true,
        type: String
    },
    roles: {
        required: true,
        type: [String]
    }
})

const User = mongoose.model("user", UserSchema)

export default User;