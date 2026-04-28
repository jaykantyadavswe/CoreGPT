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


/* 
app.post("/test", async (req, res) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  const MODEL = "gemini-3-flash-preview";
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: req.body.message }]
        }
      ]
    })
  };

  try {
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
    res.send(data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.log(err);
  }
}); */

/* const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const response = await client.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "What is OS? in short answer",
});

console.log(response.text); */

app.listen(port, () => {
  console.log(`server running on ${port}`);
})

