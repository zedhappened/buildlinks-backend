import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    colorName: {
        required: true,
        type: String
    },
    colorCode: {
        required: true,
        unique: true,
        type: String
    },
    colorImage: {
        required: true,
        type: String
    },
});

const Color = mongoose.model('color', ColorSchema);

export default Color;