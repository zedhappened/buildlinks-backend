import { Category } from "../models";

export const getCategories = async (req, res) => {

    const categories = await Category.find();

    res.json(categories);
}

export const createCategory = async (req, res) => {

    if (!req.body?.title)
        throw new Error("Title is required")

    const category = await Color.create({ ...req.body });

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