import Color from '../models/color.model.js';

export const getColorsByPage = async (req, res) => {
    const { page } = req.params;
    const colors = await Color.find().limit(12).skip(12 * (page - 1));

    const count = await Color.countDocuments()

    res.json({ colors, pages: Math.floor(count / 12) + 1 });
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