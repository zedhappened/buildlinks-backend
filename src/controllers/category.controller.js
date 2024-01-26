import { Category } from "../models";

export const getAllCategories = async (req, res) => {

    const categories = await Category.find();

    res.json(categories);
}

export const getParentCategories = async (req, res) => {

    const categories = await Category.find({ parent: null });

    res.json(categories);
}

export const getCategories = async (req, res) => {

    const { page, search } = req.query;

    let categories, count;

    if (search != "" && search != "null") {
        categories = await Category.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] }).limit(12).skip(12 * (page - 1));
        count = await Category.countDocuments({ $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] });
    } else {
        categories = await Category.find().limit(12).skip(12 * (page - 1));
        count = await Category.countDocuments();
    }

    res.json({ categories, pages: Math.ceil(count / 12) });
}

export const createCategory = async (req, res) => {

    if (!req.body?.name)
        throw new Error("Name is required")

    const category = await Category.create({ ...req.body });

    res.json(category);
}

export const deleteCategory = async (req, res) => {

    const { id } = req.params;

    const children = await Category.find({ parent: id })

    if (children.length > 0)
        throw new Error("Subcategories found in category")

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory)
        throw new Error("Invalid id")

    res.json(deletedCategory);
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(id, { ...req.body }, { new: true });

    if (!updatedCategory)
        throw new Error("Invalid id")

    res.json(updatedCategory);
}