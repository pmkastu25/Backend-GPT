import express from "express"
import Thread from "../models/Thread.js";

const router = express.Router();

//test
router.post("/test", async(req, res)=>{
   try{
    const thread = new Thread({
        threadId: "xyz",
        title: "Testing New Thread"
    });

    const response = await thread.save();
    console.log(response);
   } catch(err){
    console.log(err);
    res.send(500).json({error:"Failed to save DB"});
   }
});

export default router;