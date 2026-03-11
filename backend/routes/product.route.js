import express from "express";
import {
  getProducts,
  postProducts,
  deleteProducts,
  updateProducts,
} from "../controllers/product.controller.js";
// const router = express.Router();
const router = express.Router();

router.get("/", getProducts);

router.post("/", postProducts);

router.delete("/:id", deleteProducts);

router.put("/:id", updateProducts);

export default router;
