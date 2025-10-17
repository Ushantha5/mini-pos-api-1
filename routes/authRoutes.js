import express from express

import {
  getAllItem,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/authController.js";

const router = express.Router()
router.get("/", (req,res) => { 
    res.send("Get All Item")
});
router.post("/", (req,res) => { 
    res.send(" Create All Item")

});
router.put("/:id", (req,res) => { 
    res.send("Update One Item")

});
router.delete("/:id", (req,res) => { 
    res.send("Delete One Item")

});export default router