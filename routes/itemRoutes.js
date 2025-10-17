import express from express

import {
  getAllItem,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router()
router.get("/",getAllItem)
router.get("/:id",getItemById)
router.post("/",createItem);
router.put("/:id",updateItem);
router.delete("/:id", deleteItem);

export default router