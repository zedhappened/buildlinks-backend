import { Router } from "express";
import { isAdmin } from "../middlewares";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers";

const categoryRouter = Router();

categoryRouter.get('/all', getAllCategories);
categoryRouter.post('/', isAdmin(), createCategory);
categoryRouter.delete('/:id', isAdmin(), deleteCategory);
categoryRouter.patch('/:id', isAdmin(), updateCategory);

export default categoryRouter;