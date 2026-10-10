import express from "express"
import Thread from "../models/Thread.js";

const router = express.Router();

//test
router.post("/test", async(req, res)=>{
   try{
    const thread = new Thread({
        threadId: "xya",
        title: "Testing New Thread2"
    });

    const response = await thread.save();
    console.log(response);
    res.json(response);
   } catch(err){
    console.log(err);
    res.send(500).json({error:"Failed to save DB"});
   }
});

//Get all Threads
router.get("/thread", async(req, res) => {
    try{
        //descending order of updatedAt - most recent data - TOP
        const threads = await Thread.find({}).sort({updatedAt:-1});

        res.json(threads)
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
})

//get specific thread
router.get("/thread/:threadId", async(req, res)=>{
    try{
        const {threadId} = req.params;

        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error: "Thread is not found"});
        }

        console.log(thread)
        res.json(thread.messages)
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch thread"});
    }
})

//DELETE
router.delete("/thread/:threadId", async(req, res) => {
    try{
        const {threadId} = req.params;
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread){
            res.status(404).json({error: "Thread not found"})
        }

        res.status(200).json({success: "Thread deleted successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
})

export default router;