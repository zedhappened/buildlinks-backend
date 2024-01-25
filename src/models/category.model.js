import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: "",
    },
    showOnNavbar: {
        type: Boolean,
        default: false,
    },
    showOnHome: {
        type: Boolean,
        default: false,
    },
});

const Category = mongoose.model('category', categorySchema);

export default Category;