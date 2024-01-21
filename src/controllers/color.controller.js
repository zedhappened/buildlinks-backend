import Color from '../models/color.model.js';

export const getColors = async (req, res) => {
    const { page, search } = req.query;

    let colors;
    if (search != "null") {
        colors = await Color.find({ $or: [{ colorCode: { $regex: search, $options: 'i' } }, { colorName: { $regex: search, $options: 'i' } }] }).limit(12).skip(12 * (page - 1));
    } else {
        colors = await Color.find().limit(12).skip(12 * (page - 1));
    }

    const count = colors.length;

    res.json({ colors, pages: Math.floor(count / 12) + 1 });
}

export const getColorById = async (req, res) => {
    const { id } = req.params;

    const color = await Color.findById(id);

    res.json(color);
}

export const createColor = async (req, res) => {
    const { colorName, colorCode, colorImage } = req.body;

    if (!colorName || !colorCode || !colorImage)
        throw new Error("All fields are required")

    const newColor = await Color.create({ colorName, colorCode, colorImage });

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
    const { colorName, colorCode, colorImage } = req.body;

    if (!colorName || !colorCode || !colorImage)
        throw new Error("All fields are required")

    const updatedColor = await Color.findByIdAndUpdate(id, { colorName, colorCode, colorImage }, { new: true });

    if (!updatedColor)
        throw new Error("Invalid id")

    res.json(updatedColor);
}