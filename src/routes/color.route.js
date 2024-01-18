import { Router } from "express";
import { createColor, deleteColor, getColorsByPage, updateColor } from "../controllers/color.controller.js";
import isAdmin from "../middlewares/is-admin.middleware.js";

const colorRouter = Router();

colorRouter.get('/:page', getColorsByPage);
colorRouter.post('/', isAdmin(), createColor);
colorRouter.delete('/:id', isAdmin(), deleteColor);
colorRouter.patch('/:id', isAdmin(), updateColor);

export default colorRouter;