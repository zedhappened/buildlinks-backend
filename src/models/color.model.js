import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    title: {
        required: true,
        unique: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
});

const Color = mongoose.model('color', ColorSchema);

export default Color;