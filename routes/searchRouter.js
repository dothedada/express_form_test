import { Router } from "express";
import { searchController } from "../controllers/searchControllers.js";

const searchRouter = Router();

searchRouter.get("/", searchController);

export { searchRouter };
