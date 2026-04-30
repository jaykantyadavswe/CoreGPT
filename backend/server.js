import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"
 
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.ATLASDB);
    console.log("Connected with DB")
  }catch(err){
    console.log(err);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`server running on ${port}`);
})

