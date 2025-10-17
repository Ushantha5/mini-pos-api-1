import express from express

import {
  getAllsales,
  getsaleById,
  createsale,
  updatesale,
  deletesale,
} from "../controllers/saleController.js";

const router = express.Router()
router.get("/",getAllsales)
router.get("/:id",getsaleById)
router.post("/",createsale);
router.put("/:id",updatesale);
router.delete("/:id", deletesale);

export default router