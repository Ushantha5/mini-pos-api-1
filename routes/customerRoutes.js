import { customerRoutes } from "./routes/customerRoutes.js";
import express from express
const router = express.Router()
router.get("/", (req,res) => { 
    res.send("")
});
router.post("/", (req,res) => { 
    res.send("")

});
router.put("/:id", (req,res) => { 
    res.send("")

});
router.delete("/:id", (req,res) => { 
    res.send("")

});
export default router