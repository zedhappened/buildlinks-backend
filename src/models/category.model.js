import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
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
        default: null,
    },
    showOnHome: {
        type: Boolean,
        default: false,
    },
    topCategory: {
        type: Boolean,
        default: false,
    }
});

const Category = mongoose.model('category', categorySchema);

export default Category;