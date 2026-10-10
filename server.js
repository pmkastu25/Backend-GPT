// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   input: 'Joke related to Computer Science',
// });

// console.log(response.output_text);

import express from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes) //prepend all routes with /api

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
    connectDB();
})

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected with Database");
    } catch(err){
        console.log("Failed to COnnect DB", err);
    }
}

// app.post("/test", async(req,res)=>{
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages:[{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try{
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);

//         const data = await response.json();
//         console.log(data);
//         console.log(data.choices[0].message.content); //reply from the model
//         res.send(data);
//     } catch(err){
//         console.log(err);
//     }
// });