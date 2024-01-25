import { Router } from "express";
import { createColor, deleteColor, getColorById, getColors, updateColor } from "../controllers";
import { isAdmin } from "../middlewares";

const colorRouter = Router();

colorRouter.get('/', getColors);
colorRouter.get('/:id', getColorById);
colorRouter.post('/', isAdmin(), createColor);
colorRouter.delete('/:id', isAdmin(), deleteColor);
colorRouter.patch('/:id', isAdmin(), updateColor);

export default colorRouter;