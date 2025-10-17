import express from express

import {
  getAllsale,
  getsaleById,
  createsale,
  updatesale,
  deletesale,
} from "../controllers/saleController.js";

const router = express.Router()
router.get("/", (req,res) => { 
    res.send("Get All sale")
});
router.post("/", (req,res) => { 
    res.send(" Create All sale")

});
router.put("/:id", (req,res) => { 
    res.send("Update One sale")

});
router.delete("/:id", (req,res) => { 
    res.send("Delete One sale")

});export default router