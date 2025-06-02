import { Router } from "express";
import { CreateCategoryController } from "../../../application/domain/categories/use-cases/create-category/create-category-controller";
import { container } from "../../../application/kernel/di/container";
import { routeAdapter } from "../adapters/route-adapter";

export const categoriesRouter = Router();

categoriesRouter.post('/',  routeAdapter(container.resolve(CreateCategoryController)));