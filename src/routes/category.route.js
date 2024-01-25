import { Router } from "express";
import { isAdmin } from "../middlewares";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', isAdmin(), createCategory);
categoryRouter.delete('/:id', isAdmin(), deleteCategory);
categoryRouter.patch('/:id', isAdmin(), updateCategory);

export default categoryRouter;