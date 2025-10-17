import express from express

import {
  getAllauths,
  getauthById,
  createauth,
  updateauth,
  deleteauth,
} from "../controllers/authController.js";

const router = express.Router()
router.get("/",getAllauths)
router.get("/:id",getauthById)
router.post("/",createauth);
router.put("/:id",updateauth);
router.delete("/:id", deleteauth);

export default router