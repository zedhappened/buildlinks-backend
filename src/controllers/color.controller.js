import { isValidObjectId } from 'mongoose';
import Color from '../models/color.model.js';

export const getColors = async (req, res) => {
    const colors = await Color.find();

    res.json(colors);
}

export const createColor = async (req, res) => {
    const { title, image } = req.body;

    if (!title || !image)
        throw new Error("Title & image are required")

    const newColor = await Color.create({ title, image });

    res.json(newColor);
}

export const deleteColor = async (req, res) => {
    const { id } = req.params;

    // const products = await Product.findOne({
    //     'variations': {
    //         '$elemMatch': {
    //             'color': id
    //         }
    //     }
    // })

    // if (products) return res.status(404).json({ message: 'Variations exist with that color!' });

    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor)
        throw new Error("Invalid id")

    res.json(deletedColor);

}

export const updateColor = async (req, res) => {
    const { id } = req.params;
    const { title, image } = req.body;

    if (!title || !image)
        throw new Error("Title & image are required")

    const updatedColor = await Color.findByIdAndUpdate(id, { title, image }, { new: true });

    if (!updatedColor)
        throw new Error("Invalid id")

    res.json(updatedColor);
}